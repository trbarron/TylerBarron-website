import { Chess } from 'chess.js';

export const determineGameOverReason = (chessInstance) => {
  if (chessInstance.isCheckmate()) return "Checkmate";
  if (chessInstance.isDraw()) {
    if (chessInstance.isStalemate()) return "Stalemate";
    if (chessInstance.isThreefoldRepetition()) return "Threefold Repetition";
    if (chessInstance.isInsufficientMaterial()) return "Insufficient Material";
    return "Draw";
  }
  return "Game Over";
};

export const isPlayerTurn = (playerRole, chessInstance) => {
  return ((playerRole === 'w_one' || playerRole === 'w_two') && chessInstance.turn() === 'w') ||
         ((playerRole === 'b_one' || playerRole === 'b_two') && chessInstance.turn() === 'b');
};

export const getLegalMoves = (chessInstance) => {
  const dests = new Map();
  chessInstance.SQUARES.forEach(s => {
    const ms = chessInstance.moves({ square: s, verbose: true });
    if (ms.length) dests.set(s, ms.map(m => m.to));
  });
  return dests;
};

export const makeMove = (chessInstance, from, to) => {
  const newChess = new Chess(chessInstance.fen());
  const move = newChess.move({ from, to, promotion: 'q' });
  return move ? { chess: newChess, move } : null;
};