import { useContext } from 'react';

import { GameValueContext } from '@/store/contextAPI/GameProvider';

import { marks } from './constants/player';

import './styles/player.css';

export default function Player() {
  const { players } = useContext(GameValueContext);

  return (
    <section className="players">
      {players.map((player) => {
        return (
          <div className="player" key={player.id}>
            <h2 className="player__name">플레이어 {player.id + 1}</h2>
            <p className="player__color" style={{ color: player.color }}>
              {marks.find(({ name }) => name === player.mark)?.mark}
            </p>
            <p>남은 무르기 횟수 : {player.undoLimit}</p>
          </div>
        );
      })}
    </section>
  );
}
