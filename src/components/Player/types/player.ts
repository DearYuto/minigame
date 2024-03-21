import { Color } from './colors';
import { Mark } from './marks';

export type Player = {
  id: number;
  mark: Mark;
  color: Color;
  undoLimit: number;
};
