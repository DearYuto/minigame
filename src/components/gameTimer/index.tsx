import { useContext, useEffect } from 'react';

import './styles/timer.css';

import { getRandomSpaces } from '../gameboard/utils/randomMarking';
import { toast } from 'react-toastify';
import { useTimer } from './hooks/useTimer';

import { GAME_RULE } from '../../constants/gameRule';
import { MESSAGE } from '../../constants/messages';

import { GameValueContext } from '../../store/contextAPI/GameProvider';
import { useGameActions } from '../../store/contextAPI/state/useGameActions';

type Props = {
  board: Array<Array<number>>;
  setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  updateHistory: (row: number, col: number) => void;
};

export default function GameTimer({ board, setBoard, updateHistory }: Props) {
  const { time, resetTimer } = useTimer(GAME_RULE.timer);

  const { turn, players } = useContext(GameValueContext);
  const { changeTurn } = useGameActions();

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
        changeTurn(turn!);

        toast(MESSAGE.TIME_OVER);

        // 히스토리 동기화
        updateHistory(row, col);
      }

      // 타이머 리셋
      resetTimer();
    }
  }, [time, resetTimer, board, players, setBoard, updateHistory]);

  return <time className="timer">{time}</time>;
}
