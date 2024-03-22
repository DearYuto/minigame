import { CaretLeftIcon } from '@radix-ui/react-icons';

import { useGameActions } from '../../store/contextAPI/state/useGameActions';

export default function MainButton() {
  const { changeStep } = useGameActions();

  const onClick = () => {
    changeStep('MAIN');
  };

  return (
    <button onClick={onClick} className="button button--route">
      <CaretLeftIcon />
    </button>
  );
}
