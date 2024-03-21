import { colors, marks } from './constants/player';
import type { Player } from './types/player';

type Props = {
  id: number;
  defaultColor: Player['color'];
  defaultMark: Player['mark'];
};

export default function PlayerSelector({ defaultMark, defaultColor, id = 0 }: Props) {
  const onChangeMark = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.id);
  };

  const onChangeColor = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.id);
  };

  return (
    <>
      <div className="player">
        <h3>플레이어 {id + 1}</h3>

        <form onChange={onChangeMark}>
          <fieldset>
            <legend>마크를 선택해주세요.</legend>
            {marks.map(({ name, mark }) => {
              return (
                <div key={name}>
                  <input
                    defaultChecked={defaultMark === name}
                    type="radio"
                    id={name}
                    name="shape"
                    value={name}
                  />
                  <label htmlFor={name}>{mark}</label>
                </div>
              );
            })}
          </fieldset>
        </form>

        <form onChange={onChangeColor}>
          <fieldset>
            <legend>컬러를 선택해주세요.</legend>
            {colors.map((color) => {
              return (
                <div key={color}>
                  <input
                    defaultChecked={defaultColor === color}
                    key={color}
                    type="radio"
                    id={color}
                    name="color"
                    value={color}
                  />
                  <label style={{ color }} htmlFor={color}>
                    {color}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </form>
      </div>
    </>
  );
}
