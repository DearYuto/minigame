import { useContext } from 'react';

import { GameActionsContext } from '@/store/contextAPI/GameProvider';

import type { GameAction } from '@/store/contextAPI/types/gameState';

export default function Main() {
  const dispatch = useContext(GameActionsContext);

  const onClick = (action: GameAction) => () => {
    dispatch(action);
  };

  return (
    <div className="buttons">
      <button
        onClick={onClick({
          type: 'CHANGE_STEP',
          value: 'SETTING',
        })}
        className="button button--start"
      >
        게임 시작
      </button>
      <button
        onClick={onClick({
          type: 'CHANGE_STEP',
          value: 'HISTORY',
        })}
        className="button button--history"
      >
        기록
      </button>
    </div>
  );
}
