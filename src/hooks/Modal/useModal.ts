import { useState, FormEventHandler, ChangeEventHandler } from "react";
import { PlayerType } from "../../uiTypes";

const useModal = (
  blackScore: number,
  whiteScore: number,
  startNewGame: (
    blackPlayer: PlayerType,
    whitePlayer: PlayerType,
    whiteDepth: number,
    blackDepth: number
  ) => void,
  closeModal: () => void
) => {
  const [playersInput, setPlayersInput] = useState({
    blackPlayer: PlayerType.Human,
    whitePlayer: PlayerType.Human,
    blackDepth: 0,
    whiteDepth: 0,
  });
  const winMsg =
    blackScore > whiteScore
      ? "Black Wins!"
      : blackScore < whiteScore
      ? "White Wins!"
      : "Draw!";
  const resetForm = () => {
    setPlayersInput({
      blackPlayer: PlayerType.Human,
      whitePlayer: PlayerType.Human,
      blackDepth: 0,
      whiteDepth: 0,
    });
  };
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    startNewGame(
      playersInput.blackPlayer,
      playersInput.whitePlayer,
      playersInput.blackDepth,
      playersInput.whiteDepth
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
