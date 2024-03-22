import { useContext } from 'react';
import { toast } from 'react-toastify';

import { Player } from '../gamePlayer/types/player';

import './styles/gameResult.css';

import { GameValueContext } from '@/store/contextAPI/GameProvider';
import { useGameActions } from '@/store/contextAPI/state/useGameActions';

import { MESSAGE } from '@/constants/messages';
import { STORAGE } from '@/constants/storage';

type Props = {
  winnerId: Player['id'] | undefined;
  board: Array<Array<number>>;
  history: number[][];
};
export default function GameResult({ winnerId, board, history }: Props) {
  const { players } = useContext(GameValueContext);
  const { changeStep } = useGameActions();

  const onClickSave = () => {
    const gameResult = { winnerId, board, history, players };

    localStorage.setItem(STORAGE.historyKey, JSON.stringify(gameResult));

    toast(MESSAGE.SAVE);
  };

  const onClickMoveToMain = () => {
    changeStep('MAIN');
  };

  return (
    <div className="game-result">
      <div className="game-result__title">
        <h2>게임 결과</h2>
        <p>
          {winnerId === undefined || winnerId === null
            ? '무승부'
            : `플레이어 ${winnerId! + 1}님의 승리입니다.`}
        </p>
      </div>

      <div className="buttons">
        <button className="button button--primary" onClick={onClickSave}>
          게임 결과 저장
        </button>
        <button className="button button--secondary" onClick={onClickMoveToMain}>
          메인으로
        </button>
      </div>
    </div>
  );
}
