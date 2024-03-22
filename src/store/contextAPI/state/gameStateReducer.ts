import { PLAYER1, PLAYER2 } from '@/components/gamePlayer/constants/player';
import { Player } from '@/components/gamePlayer/types/player';

import type { GameAction, GameInitialState } from '../types/gameState';

import { GAME_RULE } from '@/constants/gameRule';

export const initGame: GameInitialState = {
  players: [{ ...PLAYER1 }, { ...PLAYER2 }],
  turn: null,
  boardSize: GAME_RULE.boardSize,
  winningCondition: GAME_RULE.winningCondition,
  gameStep: 'MAIN',
};

export const gameReducer = (state: GameInitialState, action: GameAction) => {
  switch (action.type) {
    case 'INIT_GAME': {
      return { ...initGame };
    }

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
      newPlayers[action.value.id].markName = action.value.markName;
      newPlayers[action.value.id].markSymbol = action.value.markSymbol;

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

    case 'CHANGE_FIRST_PLAYER': {
      return {
        ...state,
        turn: action.value.turn,
      };
    }

    default:
      return state;
  }
};
