import type { Player } from '@/components/gamePlayer/types/player';

export const validatePlayer = (players: Player[]) => {
  const marksSet = new Set(players.map((player) => player.markName));
  const colorsSet = new Set(players.map((player) => player.color));

  if (marksSet.size !== players.length && colorsSet.size !== players.length) {
    return false;
  }

  return true;
};
