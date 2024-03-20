import { GAME_RULE } from './gameRule';

const ERROR_MESSAGE = {
  MIN_SIZE: `${GAME_RULE.boardSize} 이하로는 설정할 수 없어요.`,
  MAX_SIZE: `${GAME_RULE.maxBoardSize} 이상으로 설정할 수 없어요.`,
  NOT_A_NUMBER: '숫자 값만 입력할 수 있어요.',
  MAX_CONDITION_SIZE: '게임 맵 사이즈 이상으로 설정할 수 없어요.',
} as const;

export { ERROR_MESSAGE };
