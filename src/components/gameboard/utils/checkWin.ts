import type { Player } from '@/components/player/types/player';

import { checkDirectionCount } from './checkDirectionCount';

export const checkWin = (
  board: Array<Array<number>>,
  playerId: Player['id'],
  winningCondition: number
) => {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] !== playerId) continue;

      const defaultInfo = {
        row,
        col,
        playerId,
        size,
        board,
        winningCondition,
      };

      if (
        checkDirectionCount({
          ...defaultInfo,
          deltaCol: 0,
          deltaRow: 1,
        }) || // 가로
        checkDirectionCount({
          ...defaultInfo,
          deltaCol: 1,
          deltaRow: 0,
        }) || // 세로
        checkDirectionCount({
          ...defaultInfo,
          deltaRow: 1,
          deltaCol: 1,
        }) || // 대각선 ↘
        checkDirectionCount({
          ...defaultInfo,
          deltaCol: 1,
          deltaRow: -1,
        }) // 대각선 ↗
      ) {
        return true;
      }
    }
  }

  return false;
};
