import { Position } from "../../../game/position";
import type { PlayerNumber } from "../../../game/position";

const corners = [
  [0, 0],
  [0, 7],
  [7, 0],
  [7, 7],
];

export const scoreDiffEval = (
  Position: Position,
  currentPlayer: PlayerNumber
) => {
  const myScore =
    currentPlayer === 1 ? Position.blackTiles : Position.whiteTiles;
  const opponentScore =
    currentPlayer === 2 ? Position.blackTiles : Position.whiteTiles;
  return 100 * ((myScore - opponentScore) / (myScore + opponentScore));
};

export const numMovesEval = (Position: Position) => {
  const opponentNumMoves = Position.calcValidMoves(false).length;
  const myNumMoves = Position.validMoves.length;
  return (
    100 *
    ((myNumMoves - opponentNumMoves) / (myNumMoves + opponentNumMoves) || 0)
  );
};

export const cornersEval = (
  Position: Position,
  currentPlayer: PlayerNumber
) => {
  const opponent = 3 - currentPlayer;
  let myCorners = 0;
  let opponentCorners = 0;

  for (const [row, col] of corners) {
    if (Position.board[row][col] === currentPlayer) {
      myCorners++;
    } else if (Position.board[row][col] === opponent) {
      opponentCorners++;
    }
  }

  return (
    100 * ((myCorners - opponentCorners) / (myCorners + opponentCorners) || 0)
  );
};

export const parityEval = (Position: Position) => {
  const remainingTiles = 64 - (Position.blackTiles + Position.whiteTiles);
  return remainingTiles % 2 === 0 ? -1 : 1;
};
