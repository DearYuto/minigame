export const checkDraw = (board: Array<Array<number>>) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
};
