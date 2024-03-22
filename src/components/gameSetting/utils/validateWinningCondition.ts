import { GAME_RULE } from '../../../constants/gameRule';

export const validateWinningCondition = (condition: number, boardSize: number) => {
  if (condition > boardSize || condition < GAME_RULE.boardSize) return false;

  return true;
};
