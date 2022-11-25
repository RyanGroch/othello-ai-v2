import type { FC } from "react";
import type { PlayerNumber } from "../othello-logic/game/position";
import styles from "./ScoreboardCol.module.css";
import LoadingSpinner from "./LoadingSpinner";

type ScoreboardColProps = {
  score: number;
  currentPlayer: PlayerNumber;
  playerNum: PlayerNumber;
  playerName: string;
  thinking: boolean;
  gameOver: boolean;
};

const ScoreboardCol: FC<ScoreboardColProps> = ({
  score,
  currentPlayer,
  playerNum,
  playerName,
  thinking,
  gameOver,
}) => {
  return (
    <div
      className={`${styles.scoreboard__col} ${
        currentPlayer === playerNum && !gameOver
          ? styles["scoreboard__col--highlighted"]
          : ""
      }`}
    >
      <div
        className={`${styles.scoreboard__score} ${
          styles[`scoreboard__score-${playerNum === 1 ? "black" : "white"}`]
        }`}
      >
        {score}
      </div>
      <div className={styles.scoreboard__name}>
        {thinking && currentPlayer === playerNum ? (
          <>
            {"Thinking"} <LoadingSpinner />
          </>
        ) : (
          playerName
        )}
      </div>
    </div>
  );
};

export default ScoreboardCol;
