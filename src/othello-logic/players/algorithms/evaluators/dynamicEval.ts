import { Position } from "../../../game/position";
import {
  numMovesEval,
  scoreDiffEval,
  cornersEval,
  parityEval,
} from "./evalHelpers";

enum GamePhase {
  EARLY_GAME,
  MID_GAME,
  LATE_GAME,
}

const getGamePhase = (Position: Position) => {
  const tilesCount = Position.blackTiles + Position.whiteTiles;
  if (tilesCount < 20) return GamePhase.EARLY_GAME;
  if (tilesCount < 58) return GamePhase.MID_GAME;
  return GamePhase.LATE_GAME;
};

const dynamicEval = (Position: Position) => {
  const currentPlayer = Position.playerToMove;
  const gamePhase = getGamePhase(Position);

  if (Position.gameOver) {
    return scoreDiffEval(Position, currentPlayer);
  }

  switch (gamePhase) {
    case GamePhase.EARLY_GAME:
      return 9 * cornersEval(Position, currentPlayer) + numMovesEval(Position);
    case GamePhase.MID_GAME:
      return (
        5 * cornersEval(Position, currentPlayer) +
        3 * numMovesEval(Position) +
        parityEval(Position) +
        scoreDiffEval(Position, currentPlayer)
      );
    case GamePhase.LATE_GAME:
      return (
        3 * cornersEval(Position, currentPlayer) +
        1 * numMovesEval(Position) +
        3 * parityEval(Position) +
        3 * scoreDiffEval(Position, currentPlayer)
      );
    default:
      throw new Error("Invalid game phase.");
  }
};

export default dynamicEval;
