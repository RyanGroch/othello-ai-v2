import { Position } from "../../../game/position";
import type { PlayerNumber } from "../../../game/position";

const corners = [
  [0, 0],
  [0, 7],
  [7, 0],
  [7, 7],
];

const scoreDiffEval = (Position: Position, currentPlayer: PlayerNumber) => {
  const myScore =
    currentPlayer === 1 ? Position.blackTiles : Position.whiteTiles;
  const opponentScore =
    currentPlayer === 2 ? Position.blackTiles : Position.whiteTiles;
  return (100 * (myScore - opponentScore)) / (myScore + opponentScore);
};

const numMovesEval = (Position: Position) => {
  const opponentNumMoves = Position.calcValidMoves(false).length;
  const myNumMoves = Position.validMoves.length;
  return (
    (100 * (myNumMoves - opponentNumMoves)) /
    (myNumMoves + opponentNumMoves + 1)
  );
};

const cornersEval = (Position: Position, currentPlayer: PlayerNumber) => {
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
    (100 * (myCorners - opponentCorners)) / (myCorners + opponentCorners + 1)
  );
};

const basicEval = (Position: Position) => {
  const currentPlayer = Position.playerToMove;
  return (
    3 * numMovesEval(Position) +
    scoreDiffEval(Position, currentPlayer) +
    3 * cornersEval(Position, currentPlayer)
  );
};

export default basicEval;
