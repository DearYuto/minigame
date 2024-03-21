import type { Player } from '@/components/player/types/player';

export const shuffledPlayers = (players: Player[]) => {
  const newPlayers = players
    .map((player) => {
      return {
        ...player,
        randNum: Math.random(),
      };
    })
    .sort((a, b) => a.randNum - b.randNum);

  return newPlayers;
};
