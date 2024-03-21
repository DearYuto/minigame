import type { GameStep } from './gameStep';

import { Player } from '@/components/player/types/player';

export type GameInitialState = {
  players: Player[];
  history: unknown[];
  turn: Player['id'] | null;
  boardSize: number;
  winningCondition: number;
  gameStep: GameStep;
  gameMap: Array<Array<HTMLElement>>;
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
    undoLimit: number;
  };
};

type ChangeGamemap = {
  type: 'CHANGE_GAMEMAP';
  value: Array<Array<HTMLElement>>;
};

export type GameAction =
  | ChangeTurnAction
  | ChangeBoardSizeAction
  | ChangeWinningConditionAction
  | ChangeStep
  | ChangeMark
  | ChangeColor
  | ChangeUndo
  | ChangeGamemap
  | InitGame;
