import { PlayerType } from "../../uiTypes";
import type { Players } from "../../uiTypes";
import { useState, useEffect } from "react";
import useAi from "./useAi";
import useModalState from "./useModalState";
import { Position } from "../../othello-logic/game/position";
import type { Move } from "../../othello-logic/game/helpers";
import { isMove } from "../../othello-logic/game/helpers";
import { createStopToken, stop } from "../../worker/stopToken";

const useApp = () => {
  const [position, setPosition] = useState(new Position());
  const [players, setPlayers] = useState<Players>({
    evaluators: [PlayerType.Human, PlayerType.Human],
    depth: [0, 0],
  });
  const [stopToken, setStopToken] = useState(createStopToken());

  const { aiState, startThinking, resetAiState } = useAi(position, setPosition);
  const { modal, openEndgame, openModal, closeModal, closeEndgame } =
    useModalState();

  const isValidHumanMove = (move: Move) => {
    if (players.evaluators[position.playerToMove - 1] !== PlayerType.Human)
      return false;
    return position.validMoves.includes(move);
  };

  const humanPlayMove = (move: Move) => {
    if (isMove(move) && isValidHumanMove(move)) {
      setPosition(position.playMove(move));
    }
  };

  const startNewGame = (
    BlackPlayer: PlayerType,
    WhitePlayer: PlayerType,
    BlackDepth: number,
    WhiteDepth: number
  ) => {
    const sanitizedBlackDepth = Math.floor(
      BlackDepth > 0 && BlackDepth < 11 ? BlackDepth : 0
    );
    const sanitizedWhiteDepth = Math.floor(
      WhiteDepth > 0 && WhiteDepth < 11 ? WhiteDepth : 0
    );

    setPosition(new Position());
    setPlayers({
      evaluators: [BlackPlayer, WhitePlayer],
      depth: [sanitizedBlackDepth, sanitizedWhiteDepth],
    });
    if (aiState.timeoutId) clearTimeout(aiState.timeoutId);
    stop(stopToken);
    resetAiState();
    setStopToken(createStopToken());
    closeModal();
  };

  useEffect(() => {
    if (position.gameOver) {
      openEndgame();
      return;
    }

    if (!position.validMoves.length && !position.gameOver) {
      setPosition(position.passTurn());
      return;
    }

    const index = position.playerToMove - 1;

    if (
      players.evaluators[index] !== PlayerType.Human &&
      position.validMoves.length
    ) {
      startThinking(position, players, stopToken);
    }
  }, [position, players, startThinking, openEndgame]);

  return {
    position,
    aiState,
    modal,
    players,
    humanPlayMove,
    isValidHumanMove,
    openModal,
    closeModal,
    closeEndgame,
    startNewGame,
  };
};

export default useApp;
