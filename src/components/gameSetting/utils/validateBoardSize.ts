import { GAME_RULE } from '@/constants/gameRule';

export const validateBoardSize = (boardSize: number) => {
  if (boardSize < GAME_RULE.boardSize) {
    return true;
  }

  if (boardSize > GAME_RULE.maxBoardSize) {
    return true;
  }

  return false;
};
