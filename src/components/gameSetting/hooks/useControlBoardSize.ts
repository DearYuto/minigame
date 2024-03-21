import { useContext } from 'react';
import { toast } from 'react-toastify';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { validateBoardSize } from '../utils/validateBoardSize';

import { ERROR_MESSAGE } from '@/constants/messages';

export const useControlBoardSize = () => {
  const { boardSize, winningCondition } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  const decreaseSize = () => {
    const size = boardSize - 1;

    if (!validateBoardSize(size)) {
      toast.error(ERROR_MESSAGE.MIN_SIZE);
      return;
    }

    if (winningCondition > size) {
      // 현재 승리 조건이 게임 맵보다 클 경우 게임 맵 사이즈랑 동기화
      dispatch({ type: 'CHANGE_WINNING_CONDITION', value: size });
    }

    dispatch({ type: 'CHANGE_BOARD_SIZE', value: size });
  };

  const increaseSize = () => {
    if (!validateBoardSize(boardSize + 1)) {
      toast.error(ERROR_MESSAGE.MAX_SIZE);
      return;
    }

    dispatch({ type: 'CHANGE_BOARD_SIZE', value: boardSize + 1 });
  };

  return { boardSize, decreaseSize, increaseSize };
};
