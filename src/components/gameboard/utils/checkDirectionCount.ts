import type { Player } from '@/components/player/types/player';

type CheckDirectionCount = {
  row: number;
  col: number;
  size: number;
  deltaRow: number;
  deltaCol: number;
  winningCondition: number;
  board: Array<Array<number>>;
  playerId: Player['id'];
};

export const checkDirectionCount = ({
  row,
  col,
  size,
  board,
  winningCondition,
  deltaRow,
  deltaCol,
  playerId,
}: CheckDirectionCount) => {
  let count = 0;
  let r = row;
  let c = col;

  while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === playerId) {
    count++;
    r += deltaRow;
    c += deltaCol;
  }

  return count >= winningCondition;
};
