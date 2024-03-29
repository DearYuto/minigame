import { useContext } from 'react';
import { toast } from 'react-toastify';

import './styles/gameSetting.css';

import { GameValueContext } from '@/store/contextAPI/GameProvider';

import { ERROR_MESSAGE } from '@/constants/messages';

import PlayerSelector from '../gamePlayer/PlayerSelector';
import GameConditionController from './GameConditionController';

import { useControlBoardSize } from './hooks/useControlBoardSize';
import { useControlWinningCondition } from './hooks/useControlWinningCondition';

import { validatePlayer } from './utils/validatePlayer';
import { useGameActions } from '@/store/contextAPI/state/useGameActions';
import FirstPlayerSelector from './FirstPlayerSelector';

export default function GameSetting() {
  const { players } = useContext(GameValueContext);
  const { changeStep } = useGameActions();

  const { boardSize, decreaseSize, increaseSize } = useControlBoardSize();
  const { winningCondition, decreaseWinningCondition, increaseWinningCondition } =
    useControlWinningCondition();

  const onClickStart = () => {
    if (!validatePlayer(players)) {
      toast.error(ERROR_MESSAGE.SAME_PLAYER);
      return;
    }

    changeStep('GAME');
  };

  return (
    <div className="game-setting">
      <h2 className="game-setting__title">게임 설정</h2>

      <div className="game-setting__condition">
        <GameConditionController
          label="게임 맵 크기"
          labelDesc="(최소 3, 최대 10)"
          value={boardSize}
          onDecrease={decreaseSize}
          onIncrease={increaseSize}
        />

        <GameConditionController
          label="승리 조건"
          labelDesc={`최소 3, 최대 ${boardSize}`}
          value={winningCondition}
          onDecrease={decreaseWinningCondition}
          onIncrease={increaseWinningCondition}
        />

        <FirstPlayerSelector />
      </div>

      <h2 className="game-setting__title">플레이어 마크 선택</h2>
      {players.map((player) => {
        return (
          <PlayerSelector
            key={player.id}
            id={player.id}
            defaultMark={player.markName}
            defaultColor={player.color}
          />
        );
      })}

      <div className="game-setting__button">
        <button onClick={onClickStart} className="button button--start">
          게임 시작
        </button>
      </div>
    </div>
  );
}
