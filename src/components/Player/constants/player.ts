import { Player } from '../types/player';

const UNDO_LIMIT = 3;

export const PLAYER1: Player = {
  id: 0,
  color: 'blue',
  mark: 'x',
  undoLimit: UNDO_LIMIT,
};

export const PLAYER2: Player = {
  id: 1,
  color: 'red',
  mark: 'circle',
  undoLimit: UNDO_LIMIT,
};

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
];

export const colors = ['red', 'blue', 'green', 'black', 'pink'];
