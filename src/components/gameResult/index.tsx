import { useContext } from 'react';

import { Player } from '../player/types/player';

import { GameActionsContext } from '@/store/contextAPI/GameProvider';

type Props = {
  winner: Player['id'] | undefined;
  board: Array<Array<number>>;
  history: number[][];
};
export default function GameResult({ winner, board, history }: Props) {
  const dispatch = useContext(GameActionsContext);

  const onClickSave = () => {
    const gameResult = { winner, board, history };
    localStorage.setItem('gameHistory', JSON.stringify(gameResult));
  };

  const onClickMoveToMain = () => {
    dispatch({
      type: 'CHANGE_STEP',
      value: 'MAIN',
    });
  };

  return (
    <div>
      <h2>게임 결과</h2>
      <p>{!winner ? '무승부' : `플레이어 ${winner + 1}님의 승리입니다.`}</p>

      <button onClick={onClickSave}>게임 결과 저장</button>
      <button onClick={onClickMoveToMain}>메인으로</button>
    </div>
  );
}
