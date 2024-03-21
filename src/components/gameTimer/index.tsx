import { useContext, useEffect } from 'react';

import './styles/timer.css';

import { GAME_RULE } from '@/constants/gameRule';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { getRandomSpaces } from '../gameboard/utils/randomMarking';
import { shuffledPlayers } from '../gameboard/utils/shuffledPlayers';
import { toast } from 'react-toastify';
import { useTimer } from './hooks/useTimer';
import { MESSAGE } from '@/constants/messages';

type Props = {
  board: Array<Array<number>>;
  setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  updateHistory: (row: number, col: number) => void;
};

export default function GameTimer({ board, setBoard, updateHistory }: Props) {
  const { time, resetTimer } = useTimer(GAME_RULE.timer);

  const { turn, players } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  useEffect(() => {
    resetTimer();
  }, [turn, resetTimer]);

  useEffect(() => {
    if (time <= 0) {
      const spaces = getRandomSpaces(board);

      if (spaces) {
        // 보드에 빈 공간이 있는지 체크
        const [row, col] = spaces;
        setBoard((prev) => {
          const newBoard = [...prev];
          newBoard[row][col] = turn!;
          return newBoard;
        });

        // 다음 플레이어로 턴 변경
        dispatch({
          type: 'CHANGE_TURN',
          value: turn ?? shuffledPlayers(players)[0].id,
        });
        toast(MESSAGE.TIME_OVER);

        // 히스토리 동기화
        updateHistory(row, col);
      }

      // 타이머 리셋
      resetTimer();
    }
  }, [time, resetTimer, board, turn, players, setBoard, dispatch, updateHistory]);

  return <time className="timer">{time}</time>;
}
