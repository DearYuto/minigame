import { DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';

type Props = {
  label: string;
  labelDesc: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function GameConditionController({
  label,
  labelDesc,
  value,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="game-setting__condition-controller">
      <label>{label}</label>
      <small>{labelDesc}</small>
      <div className="game-setting__controller">
        <button onClick={onDecrease}>
          <DoubleArrowDownIcon className="game-setting__controller--down" />
        </button>
        <input readOnly type="text" value={value} />
        <button onClick={onIncrease}>
          <DoubleArrowUpIcon className="game-setting__controller--up" />
        </button>
      </div>
    </div>
  );
}
