import { useContext, useEffect, useState } from 'react';

import { GAME_RULE } from '@/constants/gameRule';
import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';
import { getRandomSpaces } from '../gameboard/utils/randomMarking';
import { shuffledPlayers } from '../gameboard/utils/shuffledPlayers';

type Props = {
  board: Array<Array<number>>;
  setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
  updateHistory: (row: number, col: number) => void;
};

export default function GameTimer({ board, setBoard, updateHistory }: Props) {
  const [timer, setTimer] = useState<number>(GAME_RULE.timer);

  const { turn, players } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  useEffect(() => {
    setTimer(GAME_RULE.timer);
  }, [turn]);

  useEffect(() => {
    if (timer <= 0) {
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

        // 히스토리 동기화
        updateHistory(row, col);
      }

      // 타이머 리셋
      setTimer(GAME_RULE.timer);
    }
    // 타이머 감소 시작
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [timer, board, turn, players, setBoard, dispatch, updateHistory]);

  return <time>{timer}</time>;
}
