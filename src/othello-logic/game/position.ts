import {
  rowColToText,
  textToRowCol,
  directions,
  isIndexNumber,
} from "./helpers";
import type { Move, Direction, IndexNumber } from "./helpers";

// For PlayerNumber: 0 = None, 1 = Black, 2 = White
export type PlayerNumber = 0 | 1 | 2;
export type BoardType = PlayerNumber[][];

const defaultBoard: BoardType = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export class Position {
  readonly blackTiles: number;
  readonly whiteTiles: number;
  readonly validMoves: Move[];
  readonly gameOver: boolean;

  constructor(
    readonly playerToMove: PlayerNumber = 1,
    readonly board: BoardType = defaultBoard,
    readonly prevMovePassed = false
  ) {
    // Count tiles that each player has
    [this.blackTiles, this.whiteTiles] = this.board.reduce(
      (countsRow: [number, number], row) =>
        row.reduce(
          (countsCol, tile): [number, number] => [
            countsCol[0] + +(tile === 1),
            countsCol[1] + +(tile === 2),
          ],
          countsRow
        ),
      [0, 0]
    );

    this.validMoves = this.calcValidMoves();
    this.gameOver = Boolean(!this.validMoves.length && this.prevMovePassed);
  }

  passTurn() {
    if (this.validMoves.length || this.gameOver) return this;
    const newPlayerToMove = this.playerToMove === 1 ? 2 : 1;
    return new Position(newPlayerToMove, this.board, true);
  }

  playMove(move: Move): Position {
    if (this.gameOver || !this.validMoves.includes(move)) return this;

    const [playedRowIndex, playedColIndex] = textToRowCol(move);
    const newPlayerToMove = this.playerToMove === 1 ? 2 : 1;

    const capturedTiles = directions.reduce(
      (prevCapturedTiles, direction) => [
        ...prevCapturedTiles,
        ...this.parseTiles(playedRowIndex, playedColIndex, direction),
      ],
      [] as Move[]
    );

    const newBoard = this.board.map((row, currentRowIndex) => {
      if (!isIndexNumber(currentRowIndex))
        throw new Error("Row is an incorrect size.");

      return row.map((col, currentColIndex) => {
        if (!isIndexNumber(currentColIndex))
          throw new Error("Column is an incorrect size.");

        const thisTilePlayed =
          playedRowIndex === currentRowIndex &&
          playedColIndex === currentColIndex;
        return thisTilePlayed ||
          capturedTiles.includes(rowColToText(currentRowIndex, currentColIndex))
          ? this.playerToMove
          : col;
      });
    });

    return new Position(newPlayerToMove, newBoard);
  }

  calcValidMoves(thisPlayer: boolean = true) {
    const validMoves: Move[] = [];
    this.board.forEach((row, rowIndex) => {
      if (!isIndexNumber(rowIndex))
        throw new Error("Row is an incorrect size.");

      row.forEach((col, colIndex) => {
        if (!isIndexNumber(colIndex))
          throw new Error("Column is an incorrect size.");

        // Cannot play in an occupied tile
        if (col !== 0) return;

        // Check each of the 8 directions for tiles that can be captured
        for (const direction of directions) {
          if (
            this.parseTiles(rowIndex, colIndex, direction, thisPlayer).length
          ) {
            validMoves.push(rowColToText(rowIndex, colIndex));
            break;
          }
        }
      });
    });

    return validMoves;
  }

  private parseTiles(
    rowIndex: IndexNumber,
    colIndex: IndexNumber,
    direction: Direction,
    thisPlayer: boolean = true
  ): Move[] {
    const capturedTiles: Move[] = [];
    const [moveX, moveY] = direction;
    const playerCounting = thisPlayer
      ? this.playerToMove
      : 3 - this.playerToMove;
    let encounteredEnemyTile = false;

    while (true) {
      rowIndex += moveY;
      colIndex += moveX;

      if (
        !isIndexNumber(rowIndex) ||
        !isIndexNumber(colIndex) ||
        this.board[rowIndex][colIndex] === 0 ||
        (this.board[rowIndex][colIndex] === playerCounting &&
          !encounteredEnemyTile)
      )
        return [];

      encounteredEnemyTile = true;
      if (this.board[rowIndex][colIndex] === playerCounting)
        return capturedTiles;

      capturedTiles.push(rowColToText(rowIndex, colIndex));
    }
  }
}
