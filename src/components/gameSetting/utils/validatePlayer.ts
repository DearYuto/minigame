import type { Player } from '@/components/player/types/player';

export const validatePlayer = (players: Player[]) => {
  const marksSet = new Set(players.map((player) => player.mark));
  const colorsSet = new Set(players.map((player) => player.color));

  if (marksSet.size !== players.length && colorsSet.size !== players.length) {
    return false;
  }

  return true;
};
