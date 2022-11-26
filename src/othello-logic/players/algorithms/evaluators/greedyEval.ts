import { Position } from "../../../game/position";
import { scoreDiffEval } from "./evalHelpers";

const greedyEval = (Position: Position) => {
  const currentPlayer = Position.playerToMove;
  return scoreDiffEval(Position, currentPlayer);
};

export default greedyEval;
