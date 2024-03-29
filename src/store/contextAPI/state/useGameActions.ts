import { useCallback, useContext } from 'react';
import { GameActionsContext } from '../GameProvider';
import { Player } from '@/components/gamePlayer/types/player';
import { GameStep } from '../types/gameStep';
import { MarkName, MarkSymbol } from '@/components/gamePlayer/types/marks';
import { Color } from '@/components/gamePlayer/types/colors';

export const useGameActions = () => {
  const dispatch = useContext(GameActionsContext);
  const initGame = useCallback(() => {
    dispatch({ type: 'INIT_GAME' });
  }, [dispatch]);

  const changeBoardSize = useCallback(
    (newSize: number) => {
      dispatch({ type: 'CHANGE_BOARD_SIZE', value: newSize });
    },
    [dispatch]
  );

  const changeTurn = useCallback(
    (currentPlayerId: Player['id']) => {
      dispatch({ type: 'CHANGE_TURN', value: currentPlayerId });
    },
    [dispatch]
  );

  const changeWinningCondition = useCallback(
    (newCondition: number) => {
      dispatch({ type: 'CHANGE_WINNING_CONDITION', value: newCondition });
    },
    [dispatch]
  );

  const changeStep = useCallback(
    (newStep: GameStep) => {
      dispatch({ type: 'CHANGE_STEP', value: newStep });
    },
    [dispatch]
  );

  const changeMark = useCallback(
    (playerId: Player['id'], markName: MarkName, markSymbol: MarkSymbol) => {
      dispatch({
        type: 'CHANGE_MARK',
        value: { id: playerId, markName, markSymbol },
      });
    },
    [dispatch]
  );

  const changeColor = useCallback(
    (playerId: Player['id'], newColor: Color) => {
      dispatch({
        type: 'CHANGE_COLOR',
        value: { id: playerId, color: newColor },
      });
    },
    [dispatch]
  );

  const changeUndo = useCallback(
    (playerId: Player['id']) => {
      dispatch({
        type: 'CHANGE_UNDO',
        value: { id: playerId },
      });
    },
    [dispatch]
  );

  const changeFirstPlayer = useCallback(
    (turn: null | number) => {
      dispatch({
        type: 'CHANGE_FIRST_PLAYER',
        value: {
          turn,
        },
      });
    },
    [dispatch]
  );

  return {
    initGame,
    changeBoardSize,
    changeTurn,
    changeWinningCondition,
    changeStep,
    changeMark,
    changeColor,
    changeUndo,
    changeFirstPlayer,
  };
};
