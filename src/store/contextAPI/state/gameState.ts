import { PLAYER1, PLAYER2 } from '@/components/player/constants/player';
import { Player } from '@/components/player/types/player';

import type { GameAction, GameInitialState } from '../types/gameState';

import { GAME_RULE } from '@/constants/gameRule';

export const initGame: GameInitialState = {
  players: [{ ...PLAYER1 }, { ...PLAYER2 }],
  history: [],
  turn: null,
  boardSize: GAME_RULE.boardSize,
  winningCondition: GAME_RULE.winningCondition,
  gameStep: 'MAIN',
  gameMap: [[]],
};

export const gameReducer = (state: GameInitialState, action: GameAction) => {
  switch (action.type) {
    case 'CHANGE_TURN': {
      const currentIndex = state.players.findIndex((player) => player.id === action.value);
      const nextIndex = (currentIndex + 1) % state.players.length;

      return { ...state, turn: nextIndex as Player['id'] };
    }

    case 'CHANGE_BOARD_SIZE':
      return { ...state, boardSize: action.value };

    case 'CHANGE_WINNING_CONDITION':
      return { ...state, winningCondition: action.value };

    case 'CHANGE_STEP': {
      return { ...state, gameStep: action.value };
    }

    case 'CHANGE_MARK': {
      const newPlayers = state.players.map((player) => {
        return {
          ...player,
        };
      });
      newPlayers[action.value.id].mark = action.value.mark;

      return {
        ...state,
        players: newPlayers,
      };
    }

    case 'CHANGE_COLOR': {
      const newPlayers = state.players.map((player) => {
        return {
          ...player,
        };
      });
      newPlayers[action.value.id].color = action.value.color;

      return {
        ...state,
        players: newPlayers,
      };
    }

    case 'CHANGE_UNDO': {
      const newPlayers = state.players.map((player) => {
        return {
          ...player,
        };
      });

      const playerId = action.value.id;
      newPlayers[playerId].undoLimit = state.players[playerId].undoLimit - 1;

      return {
        ...state,
        players: newPlayers,
      };
    }

    default:
      return state;
  }
};
