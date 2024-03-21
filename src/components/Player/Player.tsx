import { useContext } from 'react';

import { GameValueContext } from '@/store/contextAPI/GameProvider';

import { marks } from './constants/player';

export default function Player() {
  const { players, turn } = useContext(GameValueContext);

  return (
    <div>
      <div>현재 턴 : 플레이어 {turn! + 1}</div>
      {players.map((player) => {
        return (
          <div key={player.id}>
            <div>플레이어 {player.id + 1}</div>
            <div style={{ color: player.color }}>
              {marks.find(({ name }) => name === player.mark)?.mark}
            </div>
            <div>무르기 : {player.undoLimit}</div>
          </div>
        );
      })}
    </div>
  );
}
