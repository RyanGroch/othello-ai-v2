import { useState, useEffect, FC } from "react";
import type { PlayerNumber } from "../othello-logic/game/position";
import type { Move } from "../othello-logic/game/helpers";
import styles from "./Cell.module.css";

type Props = {
  value: PlayerNumber;
  id: Move;
  humanPlayMove: (Move: Move) => void;
  validHumanMove: boolean;
};

const Cell: FC<Props> = ({ value, id, humanPlayMove, validHumanMove }) => {
  const [tileIsPlaced, setTileIsPlaced] = useState(false);
  useEffect(() => {
    if (value) {
      setTimeout(() => setTileIsPlaced(true), 0);
    } else {
      setTileIsPlaced(false);
    }
  }, [value]);
  return (
    <div
      className={`${styles.cell} ${validHumanMove ? styles.valid : ""}`}
      id={id}
      onClick={() => humanPlayMove(id)}
    >
      {value ? (
        <div
          className={`${styles.cell__piece} ${
            value === 2 ? styles["cell__piece--flipped"] : ""
          } ${tileIsPlaced ? styles["cell__piece--animate"] : ""}`}
        >
          <div
            className={`${styles["cell__piece-side"]} ${styles["cell__piece-black"]}`}
          ></div>
          <div
            className={`${styles["cell__piece-side"]} ${styles["cell__piece-white"]}`}
          ></div>
        </div>
      ) : validHumanMove ? (
        <div className={styles.cell__circle}></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cell;
