import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Chessground from 'react-chessground';
import Chess from "chess.js"
import { createClient } from '@supabase/supabase-js';
import 'react-chessground/dist/styles/chessground.css';

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Subarticle from "../../components/Subarticle";
import Article from "../../components/Article";
import Modal from '../../components/Modal';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }
);

const turnTimer = 10;

function CollaborativeCheckmate() {
  const [chess, setChess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [lastMove, setLastMove] = useState();
  const [gameOver, setGameOver] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(turnTimer);
  const [playerRole, setPlayerRole] = useState(null);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedMove, setSuggestedMove] = useState(null);
  const suggestedMoveRef = useRef(null);

  const { gameID, name } = useParams();

  const timerRef = useRef(null);
  const remainingTimeRef = useRef(turnTimer);

  const updateGameState = useCallback((gameData) => {
    const newChess = new Chess(gameData.fen);
    setChess(newChess);
    setFen(newChess.fen());
    const isOver = gameData.game_over;
    setGameOver(isOver ? determineGameOverReason(newChess) : "");
    if (isOver) setShowGameOverModal(true);
    if (gameData.last_move_from && gameData.last_move_to) {
      setLastMove([gameData.last_move_from, gameData.last_move_to]);
    }
  }, []);

  const determinePlayerRole = useCallback((gameData) => {
    if (gameData.w_one === name) setPlayerRole('w_one');
    else if (gameData.w_two === name) setPlayerRole('w_two');
    else if (gameData.b_one === name) setPlayerRole('b_one');
    else if (gameData.b_two === name) setPlayerRole('b_two');
    else setPlayerRole(null);
  }, [name]);

  const fetchGameState = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('game_id', gameID)
        .single();

      if (error) throw error;

      updateGameState(data);
      determinePlayerRole(data);

    } catch (error) {
      console.error('Error fetching game state:', error);
      setError('Failed to load game state. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [gameID, updateGameState, determinePlayerRole]);

  const handleGameUpdate = useCallback((payload) => {
    updateGameState(payload.new);
  }, [updateGameState]);

  useEffect(() => {
    const channel = supabase
      .channel(`game:${gameID}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'games' }, handleGameUpdate)
      .subscribe();

    fetchGameState();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameID, fetchGameState, handleGameUpdate]);

  const isPlayerTurn = useCallback(() => {
    return ((playerRole === 'w_one' || playerRole === 'w_two') && chess.turn() === 'w') ||
           ((playerRole === 'b_one' || playerRole === 'b_two') && chess.turn() === 'b');
  }, [chess, playerRole]);

  const submitMove = useCallback(async () => {
    if (!isPlayerTurn()) return;
    const currentSuggestedMove = suggestedMoveRef.current;
    console.log('Submitting move:', currentSuggestedMove);
    if (!currentSuggestedMove) return;
  
    try {
      // Submit the move to the move_selections table
      await supabase
        .from('move_selections')
        .upsert({
          game_id: gameID,
          player_name: playerRole,
          suggested_fen: currentSuggestedMove.fen
        });
  
      console.log('Move submitted, calling evaluate-moves function');
  
      // Call the evaluate-moves Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('evaluate-moves', {
        body: { gameID }
      });
  
      if (functionError) {
        throw functionError;
      }
  
      console.log('Evaluate-moves function response:', data);
  
      // If the function indicates that it's waiting for other players, we don't need to do anything else
      if (data.message === 'Waiting for all players to submit moves') {
        console.log('Waiting for other player to submit move');
      } else {
        // If a move was selected and applied, fetch the updated game state
        await fetchGameState();
      }
  
    } catch (error) {
      console.error('Error submitting move or evaluating moves:', error);
      setError('Failed to submit move or evaluate moves. Please try again.');
    } finally {
      setSuggestedMove(null);
      suggestedMoveRef.current = null;
    }
  }, [gameID, isPlayerTurn, playerRole, fetchGameState]);

  useEffect(() => {
    const shouldStartTimer = isPlayerTurn() && !gameOver;
    if (shouldStartTimer) {
      remainingTimeRef.current = turnTimer;
      setTimeRemaining(turnTimer);

      const startTime = new Date().getTime();

      const updateTimer = () => {
        const now = new Date().getTime();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, turnTimer - elapsed);
        
        remainingTimeRef.current = remaining;
        setTimeRemaining(remaining);

        if (remaining === 0) {
          clearInterval(timerRef.current);
          submitMove();
        }
      };

      timerRef.current = setInterval(updateTimer, 100);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [chess.turn(), gameOver, isPlayerTurn, submitMove]);

  const onMove = useCallback((from, to) => {
    if (isPlayerTurn() && !gameOver) {
      const newChess = new Chess(chess.fen());
      const move = newChess.move({ from, to, promotion: 'q' });
      if (move) {
        const newSuggestedMove = { from, to, fen: newChess.fen() };
        setSuggestedMove(newSuggestedMove);
        suggestedMoveRef.current = newSuggestedMove;
        console.log('Suggested move set:', newSuggestedMove);
      }
    }
  }, [chess, isPlayerTurn, gameOver]);

  const getLegalMoves = useCallback(() => {
    if (timeRemaining <= 0) return new Map();
    const dests = new Map();
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length) dests.set(s, ms.map(m => m.to));
    });
    return dests;
  }, [chess, timeRemaining]);

  const checkForTeamMoveCompletion = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('move_selections')
        .select('player_name, suggested_fen')
        .eq('game_id', gameID);

      if (error) throw error;

      const teamMoves = data.reduce((acc, move) => {
        acc[move.player_name] = move.suggested_fen;
        return acc;
      }, {});

      const isTeamMoveComplete = 
        (chess.turn() === 'w' && teamMoves.w_one && teamMoves.w_two) ||
        (chess.turn() === 'b' && teamMoves.b_one && teamMoves.b_two);

      if (isTeamMoveComplete) {
        await evaluateMoves();
      }
    } catch (error) {
      console.error('Error checking team move completion:', error);
      setError('Failed to process team moves. Please try again.');
    }
  }, [chess, gameID]);

  const evaluateMoves = useCallback(async () => {
    try {
      const { error } = await supabase.functions.invoke('evaluate-moves', {
        body: { gameID }
      });

      if (error) throw error;

      await fetchGameState();
    } catch (error) {
      console.error('Error evaluating moves:', error);
      setError('Failed to evaluate moves. Please try again.');
    }
  }, [gameID, fetchGameState]);

  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === "white" ? "black" : "white");
  }, []);

  const determineGameOverReason = useCallback((chessInstance) => {
    if (chessInstance.isCheckmate()) return "Checkmate";
    if (chessInstance.isDraw()) return "Draw";
    if (chessInstance.isStalemate()) return "Stalemate";
    if (chessInstance.isThreefoldRepetition()) return "Threefold Repetition";
    if (chessInstance.isInsufficientMaterial()) return "Insufficient Material";
    return "Game Over";
  }, []);

  if (isLoading) {
    return <div>Loading game...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-background bg-fixed min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Article
          title="Collaborative Checkmate"
          subtitle={`Game ID: ${gameID} | Player: ${name} (Role: ${playerRole || 'Spectator'})`}
        >
          <Subarticle>
            <div className="mx-auto grid gap-x-4 grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 md:ml-iauto" style={{ gridTemplateColumns: "80% 20%", marginLeft: "-0.5rem", marginRight: "0.5rem" }}>
              <div className="w-100% col-span-2 md:col-span-1">
              <Chessground
                fen={fen}
                orientation={boardOrientation}
                turnColor={chess.turn() === 'w' ? 'white' : 'black'}
                lastMove={lastMove}
                onMove={onMove}
                movable={{
                  free: false,
                  color: isPlayerTurn() ? (chess.turn() === 'w' ? 'white' : 'black') : 'none',
                  dests: isPlayerTurn() ? getLegalMoves() : new Map(),
                  events: { after: onMove },
                }}
                drawable={{
                  enabled: true,
                  visible: true,
                  autoShapes: suggestedMove ? [{ 
                    orig: suggestedMove.from, 
                    dest: suggestedMove.to, 
                    brush: 'yellow',
                  }] : [],
                }}
                animation={{ enabled: true }}
                width={"100%"}
                height={"0"}
                style={{ paddingTop: "100%" }}
              />
              </div>

              <div className="justify-center text-center grid gap-y-3 h-80 md:h-full md:grid-cols-1 w-full grid-cols-3 col-span-2 md:col-span-1 gap-x-4 py-2 md:py-0">
                <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1 md:h-60 h-36">
                  <div className="w-full text-gray border-b-2 z-30 bg-white border-green-500 py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md">
                    Game Info
                  </div>
                  <div className="flex flex-col items-center justify-center px-4 pb-0 -mt-3 z-10 md:py-2 bg-gray text-gray-light text-xs md:text-xs h-full overflow-y-hidden">
                    <p>Current Team: {chess.turn()}</p>
                    <p>Your Role: {playerRole || 'Spectator'}</p>
                    {isPlayerTurn() && !gameOver && (
                      <p>Time Remaining: {timeRemaining} seconds</p>
                    )}
                    {gameOver && <p>Game Over: {gameOver}</p>}
                  </div>
                </div>

                <button
                  className="w-full bg-white text-gray-800 rounded border-b-2 border-green-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                  onClick={flipBoard}
                  aria-label="Flip board orientation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </Subarticle>
        </Article>
        <div className="visible">
          <Article title="About Collaborative Checkmate">
            <Subarticle subtitle="">
              <p>
                Collaborative Checkmate is a 2v2 chess variant where teammates work together to outmaneuver their opponents. Each player has 10 seconds to make a move, after which the best move from the team is selected. Coordinate with your partner and outsmart your opponents!
              </p>
            </Subarticle>
          </Article>
        </div>
      </main>
      <Footer />
      {showGameOverModal && (
        <Modal onClose={() => setShowGameOverModal(false)}>
          <div className="text-lg font-semibold text-gray-900">{gameOver}</div>
          <p className="mt-2 text-base text-gray-600">The game has ended. Thank you for playing!</p>
        </Modal>
      )}
    </div>
  );
}

export default CollaborativeCheckmate;