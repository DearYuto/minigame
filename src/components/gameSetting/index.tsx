import { useContext } from 'react';
import { toast } from 'react-toastify';

import './styles/gameSetting.css';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';
import { validateBoardSize } from './utils/validateBoardSize';
import { validateWinningCondition } from './utils/validateWinningCondition';

import { ERROR_MESSAGE } from '@/constants/messages';

import PlayerSelector from '../player/PlayerSelector';
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';
import GameConditionController from './GameConditionController';

export default function GameSetting() {
  const { boardSize, winningCondition, players } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  /**
   * 게임 맵 크기 설정
   */
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

  /**
   * 승리 조건 설정
   */
  const decreaseWinningCondition = () => {
    console.log(winningCondition - 1, boardSize);
    if (!validateWinningCondition(winningCondition - 1, boardSize)) {
      toast.error(ERROR_MESSAGE.MIN_SIZE);
      return;
    }

    dispatch({ type: 'CHANGE_WINNING_CONDITION', value: winningCondition - 1 });
  };

  const increaseWinningCondition = () => {
    if (!validateWinningCondition(winningCondition + 1, boardSize)) {
      toast.error(ERROR_MESSAGE.MAX_CONDITION_SIZE);
      return;
    }

    dispatch({ type: 'CHANGE_WINNING_CONDITION', value: winningCondition + 1 });
  };

  /**
   * 게임 시작
   */
  const onClickStart = () => {
    const marksSet = new Set(players.map((player) => player.mark));
    const colorsSet = new Set(players.map((player) => player.color));

    if (marksSet.size !== players.length && colorsSet.size !== players.length) {
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
      </div>

      <h2 className="game-setting__title">플레이어 마크 선택</h2>
      {players.map((player) => {
        return (
          <PlayerSelector
            key={player.id}
            id={player.id}
            defaultMark={player.mark}
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
