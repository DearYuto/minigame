import { marks } from '../constants/player';

export type MarkName = (typeof marks)[number]['name'];

export type MarkSymbol = (typeof marks)[number]['mark'];
