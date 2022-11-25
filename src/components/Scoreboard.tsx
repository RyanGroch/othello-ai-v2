import type { FC } from "react";
import type { PlayerNumber } from "../othello-logic/game/position";
import ScoreboardCol from "./ScoreboardCol";
import styles from "./Scoreboard.module.css";

type ScoreboardProps = {
  blackScore: number;
  whiteScore: number;
  currentPlayer: PlayerNumber;
  players: [string, string];
  thinking: boolean;
  gameOver: boolean;
};

const Scoreboard: FC<ScoreboardProps> = ({
  blackScore,
  whiteScore,
  currentPlayer,
  players: [blackPlayer, whitePlayer],
  thinking,
  gameOver,
}) => {
  return (
    <div className={styles.scoreboard}>
      <ScoreboardCol
        score={blackScore}
        currentPlayer={currentPlayer}
        playerNum={1}
        playerName={blackPlayer}
        thinking={thinking}
        gameOver={gameOver}
      />
      <ScoreboardCol
        score={whiteScore}
        currentPlayer={currentPlayer}
        playerNum={2}
        playerName={whitePlayer}
        thinking={thinking}
        gameOver={gameOver}
      />
    </div>
  );
};

export default Scoreboard;
