import { GameValueContext } from '@/store/contextAPI/GameProvider';
import { useContext } from 'react';

export default function Player() {
  const { players, turn } = useContext(GameValueContext);

  return (
    <div>
      {players.map((player) => {
        return (
          <div key={player.id}>
            <div>현재 턴 : {turn}</div>
            <div>플레이어 {player.id + 1}</div>
            <div style={{ color: player.color }}>{player.mark}</div>
          </div>
        );
      })}
    </div>
  );
}
