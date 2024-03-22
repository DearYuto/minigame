import { useContext } from 'react';
import { toast } from 'react-toastify';

import { validateWinningCondition } from '../utils/validateWinningCondition';

import { GameActionsContext, GameValueContext } from '../../../store/contextAPI/GameProvider';

import { ERROR_MESSAGE } from '../../../constants/messages';

export const useControlWinningCondition = () => {
  const { boardSize, winningCondition } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  /**
   * 승리 조건 설정
   */
  const decreaseWinningCondition = () => {
    if (!validateWinningCondition(winningCondition - 1, boardSize)) {
      toast.error(ERROR_MESSAGE.MIN_SIZE);
      return;
    }

    dispatch({ type: 'CHANGE_WINNING_CONDITION', value: winningCondition - 1 });
  };

  const increaseWinningCondition = () => {
    if (!validateWinningCondition(winningCondition + 1, boardSize)) {
      toast.error(ERROR_MESSAGE.MAX_CONDITION_SIZE);
      return;
    }

    dispatch({ type: 'CHANGE_WINNING_CONDITION', value: winningCondition + 1 });
  };

  return { winningCondition, decreaseWinningCondition, increaseWinningCondition };
};
