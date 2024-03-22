import type { Player } from './types/player';
import type { Color } from './types/colors';

import { colors, marks } from './constants/player';

import './styles/playerSelector.css';

import { useGameActions } from '@/store/contextAPI/state/useGameActions';

type Props = {
  id: number;
  defaultColor: Player['color'];
  defaultMark: Player['markName'];
};

export default function PlayerSelector({ defaultMark, defaultColor, id = 0 }: Props) {
  const { changeMark, changeColor } = useGameActions();

  const onChangeMark = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { mark, name } = marks.find((m) => m.name === e.target.value)!;
    changeMark(id, name, mark);
  };

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value as Color;
    changeColor(id, color);
  };

  return (
    <>
      <div className="player-selector">
        <h3 className="player-selector__title">플레이어 {id + 1}</h3>
        <div className="player-selector__forms">
          <form className="player-selector__form">
            <fieldset>
              <legend>마크 선택</legend>
              <div className="player-selector__marks">
                {marks.map(({ name, mark }) => {
                  return (
                    <div className="player-selector__marks-box" key={name}>
                      <input
                        onChange={onChangeMark}
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

          <form>
            <fieldset>
              <legend>컬러 선택</legend>
              <div className="player-selector__colors">
                {colors.map((color) => {
                  return (
                    <div className="player-selector__colors-box" key={color}>
                      <input
                        onChange={onChangeColor}
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
