import { useContext } from 'react';
import { toast } from 'react-toastify';

import './styles/gameSetting.css';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';
import { validateBoardSize } from './utils/validateBoardSize';
import { validateWinningCondition } from './utils/validateWinningCondition';

import { ERROR_MESSAGE } from '@/constants/messages';

import PlayerSelector from '../player/PlayerSelector';
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';

export default function GameSetting() {
  const { boardSize, winningCondition, players } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

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

  const onClickStart = () => {
    // TODO 플레이어 확장성 고려하면 하드코딩하면 안될듯 ?
    if (players[0].mark === players[1].mark && players[0].color === players[1].color) {
      toast.error('모든 플레이어의 마크와 색상이 동일합니다.');
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
        <div className="game-setting__map-size">
          <label>게임 맵 크기</label>
          <small>(최소 3, 최대 10)</small>
          <div className="game-setting__controller">
            <button onClick={decreaseSize}>
              <DoubleArrowDownIcon className="game-setting__controller--down" />
            </button>
            <input readOnly type="text" value={boardSize} />
            <button onClick={increaseSize}>
              <DoubleArrowUpIcon className="game-setting__controller--up" />
            </button>
          </div>
        </div>

        <div className="game-setting__winning-condition">
          <label htmlFor="winning-condition">승리 조건</label>
          <small>(최소 3, 최대 {boardSize})</small>
          <div className="game-setting__controller">
            <button onClick={decreaseWinningCondition}>
              <DoubleArrowDownIcon className="game-setting__controller--down" />
            </button>
            <input
              readOnly
              value={winningCondition}
              id="winning-condition"
              type="text"
              placeholder="승리 조건을 설정해주세요. (3 이상)"
            />
            <button onClick={increaseWinningCondition}>
              <DoubleArrowUpIcon className="game-setting__controller--up" />
            </button>
          </div>
        </div>
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
