import { GameActionsContext } from '@/store/contextAPI/GameProvider';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';

export default function MainButton() {
  const dispatch = useContext(GameActionsContext);

  const onClick = () => {
    dispatch({
      type: 'CHANGE_STEP',
      value: 'MAIN',
    });
  };

  return (
    <button onClick={onClick} className="button button--route">
      <CaretLeftIcon />
    </button>
  );
}
