import { GAME_RULE } from '@/constants/gameRule';

export const validateBoardSize = (boardSize: number) => {
  if (boardSize < GAME_RULE.boardSize) {
    return false;
  }

  if (boardSize > GAME_RULE.maxBoardSize) {
    return false;
  }

  return true;
};
