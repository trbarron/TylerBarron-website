import React, { useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';
import { isPlayerTurn, getLegalMoves, makeMove } from '../../utils/chessHelpers';


import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Subarticle from "../../components/Subarticle";
import Article from "../../components/Article";
import Modal from '../../components/Modal';
import ProgressTimer from '../../components/ProgressTimer';
import PlayerNames from '../../components/PlayerNames';

import useGameState from './useGameState';
import useMoveSubmission from './useMoveSubmission';
import useGameTimer from './useGameTimer';

const turnTimer = 10;

function CollaborativeCheckmate() {
  const { gameID, name } = useParams();
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  
  const {
    chess,
    fen,
    lastMove,
    gameOver,
    playerRole,
    isLoading,
    error,
    gameData,
    fetchGameState
  } = useGameState(gameID, name);

  const {
    suggestedMove,
    setSuggestedMove,
    submitMove
  } = useMoveSubmission(gameID, chess, playerRole, fetchGameState);

  const {
    timeRemaining,
    gamePhase,
    startTimer
  } = useGameTimer(turnTimer, chess, playerRole, gameOver, submitMove);

  const playerCanMove = useCallback(() => isPlayerTurn(playerRole, chess), [chess, playerRole]);


  const onMove = useCallback((from, to) => {
    if (playerCanMove() && !gameOver) {
      const result = makeMove(chess, from, to);
      if (result) {
        const newSuggestedMove = { from, to, fen: result.chess.fen() };
        setSuggestedMove(newSuggestedMove);
        startTimer();
      }
    }
  }, [chess, playerCanMove, gameOver, setSuggestedMove, startTimer]);

  const legalMoves = useCallback(() => {
    return timeRemaining > 0 ? getLegalMoves(chess) : new Map();
  }, [chess, timeRemaining]);

  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === "white" ? "black" : "white");
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
              <div className="w-100% col-span-2 md:col-span-1 relative">
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
                <PlayerNames gameData={gameData} />
              </div>

              <div className="justify-center text-center grid gap-y-3 h-80 md:h-full md:grid-cols-1 w-full grid-cols-3 col-span-2 md:col-span-1 gap-x-4 py-2 md:py-0">
                <div className="bg-white shadow rounded-lg overflow-hidden w-full col-span-3 md:col-span-1 md:h-60 h-36">
                  <div className="w-full text-gray border-b-2 z-30 bg-white border-green-500 py-0 md:py-2 inline-flex items-center justify-center font-bold text-sm md:text-md">
                    Game Info
                  </div>
                  <div className="flex flex-col items-center justify-center px-4 pb-0 -mt-3 z-10 md:py-2 bg-gray text-gray-light text-xs md:text-xs h-full overflow-y-hidden">
                    <p>Current Team: {chess.turn()}</p>
                    <p>Your Role: {playerRole || 'Spectator'}</p>
                    <p>Game Phase: {gamePhase}</p>
                    {isPlayerTurn() && !gameOver && (
                      <ProgressTimer timeRemaining={timeRemaining} totalTime={turnTimer} />
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