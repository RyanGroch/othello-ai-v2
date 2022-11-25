const indexNumbers = [0, 1, 2, 3, 4, 5, 6, 7] as const;
const moveNumbers = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const moveLetters = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

export const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
] as const;

// Types
export type IndexNumber = typeof indexNumbers[number];
type MoveLetter = typeof moveLetters[number];
type MoveNumber = typeof moveNumbers[number];

export type Direction = typeof directions[number];
export type Move = `${MoveLetter}${MoveNumber}`;

// Inverse of moveLetters
const letterToNum = new Map<MoveLetter, IndexNumber>(
  indexNumbers.map((i) => [moveLetters[i], i])
);

// Type checkers
const isMoveNumber = (num: number): num is MoveNumber =>
  !!moveNumbers.filter((n) => n === num).length;

const isMoveLetter = (letter: string): letter is MoveLetter =>
  !!moveLetters.filter((l) => letter === l).length;

export const isIndexNumber = (num: number): num is IndexNumber =>
  !!indexNumbers.filter((n) => n === num).length;

export const isMove = (s: string): s is Move => {
  const [letter, num] = s.split("");
  return s.length === 2 && isMoveLetter(letter) && isMoveNumber(Number(num));
};

// Text-RowCol conversions
export const rowColToText = (row: IndexNumber, col: IndexNumber): Move => {
  const number = 8 - row;
  if (!isMoveNumber(number)) throw new Error("Unexpected type");

  const letter: MoveLetter = moveLetters[col];
  return `${letter}${number}`;
};

export const textToRowCol = (move: Move): [IndexNumber, IndexNumber] => {
  const splitMove = move.split("");
  const [letter, number] = [splitMove[0], Number(splitMove[1])];
  const row = 8 - number;
  if (!isMoveLetter(letter) || !isIndexNumber(row))
    throw new Error("Unexpected type");

  const col = letterToNum.get(letter);
  if (col === undefined) throw new Error("Unexpected type");

  return [row, col];
};
