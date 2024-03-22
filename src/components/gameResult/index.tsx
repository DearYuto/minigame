import { useContext } from 'react';

import { Player } from '../player/types/player';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

type Props = {
  winnerId: Player['id'] | undefined;
  board: Array<Array<number>>;
  history: number[][];
};
export default function GameResult({ winnerId, board, history }: Props) {
  const { players } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  const onClickSave = () => {
    const gameResult = { winnerId, board, history, players };
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
      <p>
        {winnerId === undefined || winnerId === null
          ? '무승부'
          : `플레이어 ${winnerId! + 1}님의 승리입니다.`}
      </p>

      <button onClick={onClickSave}>게임 결과 저장</button>
      <button onClick={onClickMoveToMain}>메인으로</button>
    </div>
  );
}
