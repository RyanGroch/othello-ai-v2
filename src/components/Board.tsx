import type { FC } from "react";
import {
  IndexNumber,
  isIndexNumber,
  Move,
} from "../othello-logic/game/helpers";
import type { BoardType } from "../othello-logic/game/position";
import { rowColToText } from "../othello-logic/game/helpers";
import Cell from "./Cell";
import styles from "./Board.module.css";

type Props = {
  board: BoardType;
  humanPlayMove: (move: Move) => void;
  isValidHumanMove: (move: Move) => boolean;
};

const Board: FC<Props> = ({ board, humanPlayMove, isValidHumanMove }) => {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (!isIndexNumber(rowIndex) || !isIndexNumber(colIndex))
            return <></>;

          const tileId = rowColToText(rowIndex, colIndex);
          return (
            <Cell
              key={tileId}
              id={tileId}
              value={col}
              humanPlayMove={humanPlayMove}
              validHumanMove={isValidHumanMove(tileId)}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
