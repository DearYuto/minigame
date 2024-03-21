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

export type GameAction = ChangeTurnAction | ChangeBoardSizeAction | ChangeWinningConditionAction;
