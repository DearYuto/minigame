import { useContext, useMemo } from 'react';

import './styles/gameboard.css';

import { GameValueContext } from '@/store/contextAPI/GameProvider';
import { createBoard } from '@/utils/createBoard';
import Cell from './Cell';
import Row from './Row';

export default function Gameboard() {
  const { boardSize } = useContext(GameValueContext);

  const onClick = (e: React.MouseEvent<HTMLTableElement>) => {
    console.log(e.target);
  };

  const board = useMemo(() => createBoard(boardSize, boardSize), [boardSize]);

  const Cells = useMemo(
    () =>
      board.map((row, rowIdx) => {
        return (
          <Row key={`row ${rowIdx}`}>
            {
              <>
                {row.map((_, cellIdx) => {
                  return <Cell key={`cell ${cellIdx}`} />;
                })}
              </>
            }
          </Row>
        );
      }),
    [board]
  );

  return (
    <table className="game-board" onClick={onClick}>
      <tbody>{Cells}</tbody>
    </table>
  );
}
