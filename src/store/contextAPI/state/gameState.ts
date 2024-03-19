import { PLAYER1, PLAYER2 } from '@/components/player/constants/player';
import { Player } from '@/components/player/types/player';

import type { GameAction, GameInitialState } from '../types/gameState';

import { GAME_RULE } from '@/constants/gameRule';

export const initGame: GameInitialState = {
  players: [{ ...PLAYER1 }, { ...PLAYER2 }],
  status: [],
  turn: null,
  boardSize: GAME_RULE.boardSize,
  winningCondition: GAME_RULE.winningCondition,
};

export const gameReducer = (state: GameInitialState, action: GameAction) => {
  switch (action.type) {
    case 'CHANGE_TURN': {
      if (state.turn === null) return state;

      const currentIndex = state.players.findIndex((player) => player.id === state.turn);
      const nextIndex = (currentIndex + 1) % state.players.length;

      return { ...state, turn: nextIndex as Player['id'] };
    }

    case 'CHANGE_BOARD_SIZE':
      return { ...state, boardSize: action.value };

    case 'CHANGE_WINNING_CONDITION':
      return { ...state, winningCondition: action.value };

    default:
      return state;
  }
};
