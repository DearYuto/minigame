import { createContext, useReducer } from 'react';

import type { GameAction, GameInitialState } from './types/gameState';
import { gameReducer, initGame } from './state/gameState';

export const GameActionsContext = createContext<React.Dispatch<GameAction>>(() => {});
export const GameValueContext = createContext<GameInitialState>(initGame);

type Props = {
  children: React.ReactNode;
};
export default function GameProvider({ children }: Props) {
  const [state, dispatch] = useReducer(gameReducer, initGame);

  return (
    <GameActionsContext.Provider value={dispatch}>
      <GameValueContext.Provider value={state}>{children}</GameValueContext.Provider>
    </GameActionsContext.Provider>
  );
}
