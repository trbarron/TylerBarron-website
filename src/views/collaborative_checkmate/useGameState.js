import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import supabase from '../../utils/supabase';
import { determineGameOverReason } from '../../utils/chessHelpers';

export default function useGameState(gameID, name) {
  const [chess, setChess] = useState(() => new Chess());
  const [fen, setFen] = useState(() => chess.fen());
  const [lastMove, setLastMove] = useState();
  const [gameOver, setGameOver] = useState("");
  const [playerRole, setPlayerRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameData, setGameData] = useState(null);

  const updateGameState = useCallback((gameData) => {
    const newChess = new Chess();
    newChess.load(gameData.fen);
    setChess(newChess);
    setFen(newChess.fen());
    const isOver = gameData.game_over;
    setGameOver(isOver ? determineGameOverReason(newChess) : "");
    if (gameData.last_move_from && gameData.last_move_to) {
      setLastMove({ from: gameData.last_move_from, to: gameData.last_move_to });
    }
    setGameData(gameData);
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

  useEffect(() => {
    const channel = supabase
      .channel(`game:${gameID}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'games' }, payload => updateGameState(payload.new))
      .subscribe();

    fetchGameState();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameID, fetchGameState, updateGameState]);

  return {
    chess,
    fen,
    lastMove,
    gameOver,
    playerRole,
    isLoading,
    error,
    gameData,
    fetchGameState
  };
}