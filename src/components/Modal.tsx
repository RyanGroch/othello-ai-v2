import { FC } from "react";
import useModal from "../hooks/Modal/useModal";
import { PlayerType } from "../uiTypes";
import styles from "./Modal.module.css";
import ModalFormControl from "./ModalFormControl";

type Props = {
  showModal: boolean;
  startNewGame: (
    BlackPlayer: PlayerType,
    WhitePlayer: PlayerType,
    WhiteDepth: number,
    BlackDepth: number
  ) => void;
  closeModal: () => void;
  showEndgame: boolean;
  closeEndgame: () => void;
  blackScore: number;
  whiteScore: number;
};

const Modal: FC<Props> = ({
  showModal,
  startNewGame,
  closeModal,
  showEndgame,
  closeEndgame,
  blackScore,
  whiteScore,
}) => {
  const {
    playersInput,
    winMsg,
    handleSubmit,
    handleCloseModal,
    handleFormInput,
  } = useModal(blackScore, whiteScore, startNewGame, closeModal);
  return (
    <div
      className={`${styles.backdrop} ${
        showModal ? styles["backdrop--visible"] : ""
      }`}
    >
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h2>{showEndgame ? winMsg : "New Game"}</h2>
          <div className={styles.modal__x} onClick={handleCloseModal}>
            X
          </div>
        </div>
        {showEndgame ? (
          <div className={styles.endgame}>
            <div
              className={styles.endgame__score}
            >{`${blackScore} : ${whiteScore}`}</div>
            <button
              className="btn btn-full"
              type="button"
              onClick={closeEndgame}
            >
              New Game
            </button>
            <button
              className="btn btn-secondary btn-full"
              type="button"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <ModalFormControl
              player={playersInput.BlackPlayer}
              depth={playersInput.BlackDepth}
              name="Black"
              handleFormInput={handleFormInput}
            />
            <ModalFormControl
              player={playersInput.WhitePlayer}
              depth={playersInput.WhiteDepth}
              name="White"
              handleFormInput={handleFormInput}
            />
            <button type="submit" className="btn btn-full">
              Start New Game
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;
