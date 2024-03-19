export const createBoard = (rows: number, cols: number) => {
  return Array(rows)
    .fill('')
    .map(() => Array(cols).fill(null));
};
