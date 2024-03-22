import React, { useContext } from 'react';

import { GameValueContext } from '../../store/contextAPI/GameProvider';
import { useGameActions } from '../../store/contextAPI/state/useGameActions';

export default function FirstPlayerSelector() {
  const { players } = useContext(GameValueContext);
  const { changeFirstPlayer } = useGameActions();

  return (
    <form
      onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
        const turn = e.target.id === 'null' ? null : Number(e.target.id);
        changeFirstPlayer(turn);
      }}
      className="game-setting__condition-controller player-selector"
    >
      <label>선공</label>
      <small>먼저 시작할 플레이어를 선택해주세요.</small>
      <div className="game-setting__controller">
        <input defaultChecked type="radio" id={'null'} name="initiative" value={'random'} />
        <label htmlFor={'null'}>랜덤</label>

        {players.map((player, idx) => {
          return (
            <React.Fragment key={player.id}>
              <input
                type="radio"
                id={String(idx)}
                name="initiative"
                value={`플레이어${player.id + 1}`}
              />
              <label htmlFor={String(idx)}>플레이어{player.id + 1}</label>
            </React.Fragment>
          );
        })}
      </div>
    </form>
  );
}
