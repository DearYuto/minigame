export const getRandomSpaces = (board: Array<Array<number>>) => {
  const emptySpaces = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null || board[row][col] === null) {
        emptySpaces.push([row, col]);
      }
    }
  }

  if (emptySpaces.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * emptySpaces.length);
  return emptySpaces[randomIndex];
};
