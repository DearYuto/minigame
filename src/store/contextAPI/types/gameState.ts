import { Player } from '@/components/player/types/player';

export type GameInitialState = {
  players: Player[];
  status: unknown[];
  turn: Player['id'] | null;
  boardSize: number;
  winningCondition: number;
};

export type GameAction = {
  type: 'CHANGE_TURN' | 'CHANGE_BOARD_SIZE' | 'CHANGE_WINNING_CONDITION';
};
