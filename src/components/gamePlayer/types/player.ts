import { Color } from './colors';
import { MarkName, MarkSymbol } from './marks';

export type Player = {
  id: number;
  markName: MarkName;
  markSymbol: MarkSymbol;
  color: Color;
  undoLimit: number;
};
