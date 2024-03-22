import { Player } from '@/components/player/types/player';
import { GAME_RULE } from './gameRule';

const ERROR_MESSAGE = {
  MIN_SIZE: `${GAME_RULE.boardSize} 이하로는 설정할 수 없어요.`,
  MAX_SIZE: `${GAME_RULE.maxBoardSize} 이상으로 설정할 수 없어요.`,
  NOT_A_NUMBER: '숫자 값만 입력할 수 있어요.',
  MAX_CONDITION_SIZE: '게임 맵 사이즈 이상으로 설정할 수 없어요.',

  SAME_PLAYER: '모든 플레이어의 마크와 색상이 동일합니다.',

  ALREADY_USED: '무르기를 이미 사용했어요.',
  NOT_USED_MORE: '무르기를 더이상 사용할 수 없어요.',
} as const;

const MESSAGE = {
  TIME_OVER: '시간초과! 다음 플레이어로 턴이 넘어갑니다.',
  DRAW: '무승부입니다.',

  printWinner: (winner: Player['id']) => `우승자는 플레이어${winner} 입니다.`,
};

export { ERROR_MESSAGE, MESSAGE };
