import { Player } from '@/components/player/types/player';

export type GameInitialState = {
  players: Player[];
  status: unknown[];
  turn: Player['id'] | null;
};

export type GameAction = {
  type: 'CHANGE_TURN';
  // TODO
};
