import { useState, FormEventHandler, ChangeEventHandler } from "react";
import { PlayerType } from "../../uiTypes";

const useModal = (
  blackScore: number,
  whiteScore: number,
  startNewGame: (
    BlackPlayer: PlayerType,
    WhitePlayer: PlayerType,
    WhiteDepth: number,
    BlackDepth: number
  ) => void,
  closeModal: () => void
) => {
  const [playersInput, setPlayersInput] = useState({
    BlackPlayer: PlayerType.Human,
    WhitePlayer: PlayerType.Human,
    BlackDepth: 0,
    WhiteDepth: 0,
  });
  const winMsg =
    blackScore > whiteScore
      ? "Black Wins!"
      : blackScore < whiteScore
      ? "White Wins!"
      : "Draw!";
  const resetForm = () => {
    setPlayersInput({
      BlackPlayer: PlayerType.Human,
      WhitePlayer: PlayerType.Human,
      BlackDepth: 0,
      WhiteDepth: 0,
    });
  };
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    startNewGame(
      playersInput.BlackPlayer,
      playersInput.WhitePlayer,
      playersInput.BlackPlayer !== PlayerType.Random
        ? playersInput.BlackDepth
        : 0,
      playersInput.WhitePlayer !== PlayerType.Random
        ? playersInput.WhiteDepth
        : 0
    );
    resetForm();
  };
  const handleCloseModal = () => {
    closeModal();
    resetForm();
  };
  const handleFormInput: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setPlayersInput({
      ...playersInput,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return {
    playersInput,
    winMsg,
    handleSubmit,
    handleCloseModal,
    handleFormInput,
  };
};

export default useModal;
