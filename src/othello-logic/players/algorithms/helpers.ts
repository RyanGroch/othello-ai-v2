import { Position } from "../../game/position";

export type EvalFunc = (Position: Position) => number;

export const evalWrap = (
  Position: Position,
  opponentMove: boolean,
  evalFunc: EvalFunc
) => {
  if (Position.playerToMove === 0)
    throw new Error("Player to move isn't specified");

  const evaluation = evalFunc(Position);
  const coeff = opponentMove ? -1 : 1;
  const finalEval = coeff * evaluation;

  return Number.isNaN(evaluation)
    ? coeff * Number.POSITIVE_INFINITY
    : finalEval;
};
