export const createEmptySpace = (board: Array<Array<number>>) => {
  const emptySpaces = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        emptySpaces.push([row, col]);
      }
    }
  }

  return emptySpaces;
};
