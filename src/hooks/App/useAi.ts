import { useState, useCallback } from "react";
import type { Players } from "../../uiTypes";
import { Position } from "../../othello-logic/game/position";

export type AiState = {
  thinking: boolean;
  timeoutId: number | null;
};

const worker = new Worker(new URL("../../worker/worker.ts", import.meta.url), {
  type: "module",
});

const useAi = (
  position: Position,
  setPosition: React.Dispatch<React.SetStateAction<Position>>
) => {
  const [aiState, setAiState] = useState<AiState>({
    thinking: false,
    timeoutId: null,
  });

  const startThinking = useCallback(
    (currPosition: Position, currPlayers: Players, currToken: string) => {
      setAiState({
        thinking: true,
        timeoutId: setTimeout(() => {
          worker.postMessage({
            position: currPosition,
            players: currPlayers,
            stopToken: currToken,
          });
        }, 500),
      });
    },
    [setAiState]
  );

  const resetAiState = () => {
    setAiState({
      thinking: false,
      timeoutId: null,
    });
  };

  worker.onmessage = (msg) => {
    const moveIndex = msg.data;
    if (typeof moveIndex !== "number")
      throw new Error("Worker returned an incorrect value.");

    const move = position.validMoves[moveIndex];
    setPosition(position.playMove(move));
    setAiState({
      ...aiState,
      thinking: false,
    });
  };
  return { aiState, startThinking, resetAiState };
};

export default useAi;
