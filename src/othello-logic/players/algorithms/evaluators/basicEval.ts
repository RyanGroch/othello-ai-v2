import { Position } from "../../../game/position";
import { numMovesEval, scoreDiffEval, cornersEval } from "./evalHelpers";

const basicEval = (Position: Position) => {
  const currentPlayer = Position.playerToMove;
  return (
    3 * numMovesEval(Position) +
    scoreDiffEval(Position, currentPlayer) +
    3 * cornersEval(Position, currentPlayer)
  );
};

export default basicEval;
