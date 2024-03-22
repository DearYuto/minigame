import type { GameStep } from './gameStep';

import { Player } from '@/components/player/types/player';

export type GameInitialState = {
  players: Player[];
  turn: Player['id'] | null;
  boardSize: number;
  winningCondition: number;
  gameStep: GameStep;
};

type InitGame = {
  type: 'INIT_GAME';
};

type ChangeTurnAction = {
  type: 'CHANGE_TURN';
  value: Player['id'];
};

type ChangeBoardSizeAction = {
  type: 'CHANGE_BOARD_SIZE';
  value: number;
};

type ChangeWinningConditionAction = {
  type: 'CHANGE_WINNING_CONDITION';
  value: number;
};

type ChangeStep = {
  type: 'CHANGE_STEP';
  value: GameStep;
};

type ChangeMark = {
  type: 'CHANGE_MARK';
  value: {
    id: Player['id'];
    markName: Player['markName'];
    markSymbol: Player['markSymbol'];
  };
};

type ChangeColor = {
  type: 'CHANGE_COLOR';
  value: {
    id: Player['id'];
    color: Player['color'];
  };
};

type ChangeUndo = {
  type: 'CHANGE_UNDO';
  value: {
    id: Player['id'];
  };
};

type ChangeFirstPlayer = {
  type: 'CHANGE_FIRST_PLAYER';
  value: {
    turn: Player['id'] | null;
  };
};

export type GameAction =
  | ChangeTurnAction
  | ChangeBoardSizeAction
  | ChangeWinningConditionAction
  | ChangeStep
  | ChangeMark
  | ChangeColor
  | ChangeUndo
  | ChangeFirstPlayer
  | InitGame;
