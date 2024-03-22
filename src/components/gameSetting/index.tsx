import { useContext } from 'react';
import { toast } from 'react-toastify';

import './styles/gameSetting.css';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { ERROR_MESSAGE } from '@/constants/messages';

import PlayerSelector from '../player/PlayerSelector';
import GameConditionController from './GameConditionController';

import { useControlBoardSize } from './hooks/useControlBoardSize';
import { useControlWinningCondition } from './hooks/useControlWinningCondition';

import { validatePlayer } from './utils/validatePlayer';

export default function GameSetting() {
  const { players } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  const { boardSize, decreaseSize, increaseSize } = useControlBoardSize();
  const { winningCondition, decreaseWinningCondition, increaseWinningCondition } =
    useControlWinningCondition();

  const onClickStart = () => {
    if (!validatePlayer(players)) {
      toast.error(ERROR_MESSAGE.SAME_PLAYER);
      return;
    }

    dispatch({
      type: 'CHANGE_STEP',
      value: 'GAME',
    });
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

        <div className="game-setting__condition-controller player-selector">
          <label>선공</label>
          <small>먼저 시작할 플레이어를 선택해주세요.</small>
          <div className="game-setting__controller">
            <input defaultChecked type="radio" id={'random'} name="initiative" value={'random'} />
            <label htmlFor={'random'}>랜덤</label>

            <input type="radio" id={'player1'} name="initiative" value="플레이어1" />
            <label htmlFor={'player1'}>플레이어1</label>

            <input type="radio" id={'player2'} name="initiative" value="플레이어2" />
            <label htmlFor={'player2'}>플레이어2</label>
          </div>
        </div>
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
