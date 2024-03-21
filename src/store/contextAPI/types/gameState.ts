import type { GameStep } from './gameStep';

import { Player } from '@/components/player/types/player';

export type GameInitialState = {
  players: Player[];
  status: unknown[];
  turn: Player['id'] | null;
  boardSize: number;
  winningCondition: number;
  gameStep: GameStep;
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
    mark: Player['mark'];
  };
};

type ChangeColor = {
  type: 'CHANGE_COLOR';
  value: {
    id: Player['id'];
    color: Player['color'];
  };
};

export type GameAction =
  | ChangeTurnAction
  | ChangeBoardSizeAction
  | ChangeWinningConditionAction
  | ChangeStep
  | ChangeMark
  | ChangeColor;
