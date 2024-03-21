import { Player } from '../types/player';

export const PLAYER1: Player = {
  id: 0,
  color: 'blue',
  mark: 'x',
};

export const PLAYER2: Player = {
  id: 1,
  color: 'red',
  mark: 'circle',
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
