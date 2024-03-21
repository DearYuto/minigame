import { Player } from '../types/player';

const UNDO_LIMIT = 3;

export const marks = [
  {
    name: 'circle',
    mark: '○',
  },
  {
    name: 'x',
    mark: '×',
  },
  {
    name: 'triangle',
    mark: '▲',
  },
  {
    name: 'square',
    mark: '■',
  },
  {
    name: 'star',
    mark: '★',
  },
] as const;

export const PLAYER1: Player = {
  id: 0,
  color: 'blue',
  markName: 'x',
  markSymbol: '×',
  undoLimit: UNDO_LIMIT,
};

export const PLAYER2: Player = {
  id: 1,
  color: 'red',
  markName: 'circle',
  markSymbol: '○',
  undoLimit: UNDO_LIMIT,
};

export const colors = ['red', 'blue', 'green', 'black', 'pink'] as const;
