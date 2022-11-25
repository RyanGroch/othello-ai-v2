import { FC } from "react";
import useModal from "../hooks/Modal/useModal";
import { PlayerType } from "../uiTypes";
import styles from "./Modal.module.css";

type Props = {
  showModal: boolean;
  startNewGame: (
    blackPlayer: PlayerType,
    whitePlayer: PlayerType,
    whiteDepth: number,
    blackDepth: number
  ) => void;
  closeModal: () => void;
  showEndgame: boolean;
  closeEndgame: () => void;
  blackScore: number;
  whiteScore: number;
};

const GetFormOptions: FC = () => {
  return (
    <>
      {Object.keys(PlayerType).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
      ;
    </>
  );
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
            <div className={styles.form__control}>
              <label htmlFor="blackPlayer">Black Player:</label>
              <select
                id="blackPlayer"
                value={playersInput.blackPlayer}
                onChange={handleFormInput}
              >
                <GetFormOptions />
              </select>
            </div>
            {playersInput.blackPlayer !== PlayerType.Human && (
              <div className={styles.form__control}>
                <label htmlFor="blackDepth">Black AI Depth:</label>
                <input
                  id="blackDepth"
                  value={playersInput.blackDepth}
                  type="number"
                  onChange={handleFormInput}
                  min="0"
                  max="10"
                />
              </div>
            )}
            <div className={styles.form__control}>
              <label htmlFor="whitePlayer">White Player:</label>
              <select
                id="whitePlayer"
                value={playersInput.whitePlayer}
                onChange={handleFormInput}
              >
                <GetFormOptions />
              </select>
            </div>
            {playersInput.whitePlayer !== PlayerType.Human && (
              <div className={styles.form__control}>
                <label htmlFor="whiteDepth">White AI Depth:</label>
                <input
                  id="whiteDepth"
                  value={playersInput.whiteDepth}
                  type="number"
                  onChange={handleFormInput}
                  min="0"
                  max="10"
                />
              </div>
            )}
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
