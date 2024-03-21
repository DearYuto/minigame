import { useContext } from 'react';

import type { Player } from './types/player';

import { colors, marks } from './constants/player';

import './styles/playerSelector.css';

import { GameActionsContext } from '@/store/contextAPI/GameProvider';

type Props = {
  id: number;
  defaultColor: Player['color'];
  defaultMark: Player['markName'];
};

export default function PlayerSelector({ defaultMark, defaultColor, id = 0 }: Props) {
  const dispatch = useContext(GameActionsContext);

  const onChangeMark = (e: React.ChangeEvent<HTMLFormElement>) => {
    const foundMark = marks.find((m) => m.name === e.target.value)!;

    dispatch({
      type: 'CHANGE_MARK',
      value: {
        id,
        markSymbol: foundMark.mark,
        markName: foundMark.name,
      },
    });
  };

  const onChangeColor = (e: React.ChangeEvent<HTMLFormElement>) => {
    dispatch({
      type: 'CHANGE_COLOR',
      value: {
        id,
        color: e.target.value,
      },
    });
  };

  return (
    <>
      <div className="player-selector">
        <h3 className="player-selector__title">플레이어 {id + 1}</h3>
        <div className="player-selector__forms">
          <form className="player-selector__form" onChange={onChangeMark}>
            <fieldset>
              <legend>마크 선택</legend>
              <div className="player-selector__marks">
                {marks.map(({ name, mark }) => {
                  return (
                    <div className="player-selector__marks-box" key={name}>
                      <input
                        defaultChecked={defaultMark === name}
                        type="radio"
                        id={`${name}${id}`}
                        name="shape"
                        value={name}
                      />
                      <label htmlFor={`${name}${id}`}>{mark}</label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </form>

          <form onChange={onChangeColor}>
            <fieldset>
              <legend>컬러 선택</legend>
              <div className="player-selector__colors">
                {colors.map((color) => {
                  return (
                    <div className="player-selector__colors-box" key={color}>
                      <input
                        defaultChecked={defaultColor === color}
                        key={color}
                        type="radio"
                        id={`${color}${id}`}
                        name="color"
                        value={color}
                      />
                      <label style={{ color }} htmlFor={`${color}${id}`}>
                        {color}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
