import { PLAYER1, PLAYER2 } from '@/components/player/constants/player';

import type { GameAction, GameInitialState } from '../types/gameState';

export const initGame: GameInitialState = {
  players: [{ ...PLAYER1 }, { ...PLAYER2 }],
  status: [],
  turn: null,
  boardSize: 3,
  winningCondition: 3,
};

export const gameReducer = (state: GameInitialState, action: GameAction) => {
  switch (action.type) {
    case 'CHANGE_TURN': {
      if (state.turn === null) return state;

      const currentIndex = state.players.findIndex((player) => player.id === state.turn);
      const nextIndex = (currentIndex + 1) % state.players.length;

      return { ...state, turn: state.players[nextIndex].id };
    }

    case 'CHANGE_BOARD_SIZE':
      return { ...state, boardSize: state.boardSize };

    case 'CHANGE_WINNING_CONDITION':
      return { ...state, winningCondition: state.winningCondition };

    default:
      return state;
  }
};
