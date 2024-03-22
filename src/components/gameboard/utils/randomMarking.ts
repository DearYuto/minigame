import { createEmptySpace } from './createEmptySpace';

const hasEmptySpaces = (emptySpaces: number[][]) => {
  return emptySpaces.length === 0;
};

export const getRandomSpaces = (board: Array<Array<number>>) => {
  const emptySpaces = createEmptySpace(board);

  if (hasEmptySpaces(emptySpaces)) return null;

  const randomIndex = Math.floor(Math.random() * emptySpaces.length);
  return emptySpaces[randomIndex];
};
