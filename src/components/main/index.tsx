import { useEffect } from 'react';

import { useGameActions } from '@/store/contextAPI/state/useGameActions';
import { GameStep } from '@/store/contextAPI/types/gameStep';

export default function Main() {
  const { changeStep, initGame } = useGameActions();

  useEffect(() => {
    initGame();
  }, [initGame]);

  const onClick = (action: GameStep) => () => {
    changeStep(action);
  };

  return (
    <div className="buttons">
      <button onClick={onClick('SETTING')} className="button button--start">
        게임 시작
      </button>
      <button onClick={onClick('HISTORY')} className="button button--history">
        기록
      </button>
    </div>
  );
}
