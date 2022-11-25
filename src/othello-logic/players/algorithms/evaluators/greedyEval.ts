import { Position } from "../../../game/position";

const greedyEval = (Position: Position) => {
  const currentPlayer = Position.playerToMove;

  const currentPlayerTiles =
    currentPlayer === 1 ? Position.blackTiles : Position.whiteTiles;
  const otherPlayerTiles =
    currentPlayer === 2 ? Position.blackTiles : Position.whiteTiles;
  return currentPlayerTiles - otherPlayerTiles;
};

export default greedyEval;
