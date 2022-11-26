import { Position } from "../othello-logic/game/position";
import basicEval from "../othello-logic/players/algorithms/evaluators/basicEval";
import dynamicEval from "../othello-logic/players/algorithms/evaluators/dynamicEval";
import greedyEval from "../othello-logic/players/algorithms/evaluators/greedyEval";
import randomEval from "../othello-logic/players/algorithms/evaluators/randomEval";
import { EvalFunc } from "../othello-logic/players/algorithms/helpers";
import minimax from "../othello-logic/players/algorithms/minimax";
import { Players, PlayerType } from "../uiTypes";
import { checkStopToken } from "./stopToken";

type Data = {
  position: Position;
  players: Players;
  stopToken: string;
};

const getEvalFunc = (evaluator: PlayerType): EvalFunc | null => {
  switch (evaluator) {
    case PlayerType.Basic:
      return basicEval;
    case PlayerType.Greedy:
      return greedyEval;
    case PlayerType.Dynamic:
      return dynamicEval;
    case PlayerType.Random:
      return randomEval;
    default:
      return null;
  }
};

const getMaxEvalIndices = (evals: number[]) => {
  let indices: number[] = [];
  let maxEval = Number.NEGATIVE_INFINITY;
  evals.forEach((evaluation, i) => {
    if (evaluation > maxEval) {
      maxEval = evaluation;
      indices = [i];
    } else if (evaluation === maxEval) {
      indices.push(i);
    }
  });
  return indices;
};

onmessage = (msg) => {
  const { position, players, stopToken } = msg.data as Data;
  const index = position.playerToMove - 1;
  const posWithMethods = new Position(
    position.playerToMove,
    position.board,
    position.prevMovePassed
  );
  const evaluator = players.evaluators[index];
  const depth = players.depth[index];

  const evalFunc = getEvalFunc(evaluator);
  if (!evalFunc) throw new Error("Invalid player type.");

  const evals = posWithMethods.validMoves.map((move) =>
    minimax(
      posWithMethods.playMove(move),
      depth,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      false,
      evalFunc,
      checkStopToken,
      stopToken
    )
  );
  const maxEvalIndices = getMaxEvalIndices(evals);
  const moveIndex =
    maxEvalIndices[Math.floor(Math.random() * maxEvalIndices.length)];

  if (!checkStopToken(stopToken)) {
    postMessage(moveIndex);
  }
};
