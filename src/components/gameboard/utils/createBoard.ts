export const createBoard = (rows: number, cols: number) => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));
};
