import { useState, useCallback } from 'react';
import supabase from '../../utils/supabase';
import { isPlayerTurn } from '../../utils/chessHelpers';

const useMoveSubmission = (gameID, chess, playerRole, fetchGameState) => {
  const [suggestedMove, setSuggestedMove] = useState(null);

  const submitMove = useCallback(async () => {
    if (!isPlayerTurn(playerRole, chess) || !suggestedMove) return;

    try {
      // Submit the move to the move_selections table
      await supabase
        .from('move_selections')
        .upsert({
          game_id: gameID,
          player_name: playerRole,
          suggested_fen: suggestedMove.fen
        });

      console.log('Move submitted, calling evaluate-moves function');

      // Call the evaluate-moves Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('evaluate-moves', {
        body: { gameID: gameID, color: chess.turn() }
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
      // You might want to set an error state here and display it to the user
    } finally {
      setSuggestedMove(null);
    }
  }, [gameID, chess, playerRole, suggestedMove, fetchGameState]);

  return {
    suggestedMove,
    setSuggestedMove,
    submitMove
  };
};

export default useMoveSubmission;