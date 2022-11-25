import { Position } from "../../game/position";
import { evalWrap } from "./helpers";

const minimax = (
  Position: Position,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean,
  evalFunc: (Position: Position) => number,
  checkStopToken: (stopToken: string) => boolean,
  stopToken: string
): number => {
  if (!stopToken || checkStopToken(stopToken)) {
    return 0;
  }

  if (depth === 0 || Position.gameOver) {
    return evalWrap(Position, !maximizingPlayer, evalFunc);
  }

  if (!Position.validMoves.length) {
    return minimax(
      Position.passTurn(),
      depth,
      alpha,
      beta,
      !maximizingPlayer,
      evalFunc,
      checkStopToken,
      stopToken
    );
  }

  if (maximizingPlayer) {
    let maxEval = Number.NEGATIVE_INFINITY;
    for (const move of Position.validMoves) {
      const currentEval = minimax(
        Position.playMove(move),
        depth - 1,
        alpha,
        beta,
        false,
        evalFunc,
        checkStopToken,
        stopToken
      );
      maxEval = Math.max(maxEval, currentEval);
      alpha = Math.max(alpha, currentEval);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    for (const move of Position.validMoves) {
      const currentEval = minimax(
        Position.playMove(move),
        depth - 1,
        alpha,
        beta,
        true,
        evalFunc,
        checkStopToken,
        stopToken
      );
      minEval = Math.min(minEval, currentEval);
      beta = Math.min(beta, currentEval);
      if (beta <= alpha) {
        break;
      }
    }

    return minEval;
  }
};

export default minimax;
