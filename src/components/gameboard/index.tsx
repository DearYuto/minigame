import { useContext, useEffect, useMemo } from 'react';

import './styles/gameboard.css';

import Cell from './Cell';
import Row from './Row';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { createBoard } from './utils/createBoard';
import { shuffledPlayers } from './utils/shuffledPlayers';
import Player from '../player/Player';
import MainButton from '../mainButton';
import { marks } from '../player/constants/player';

export default function Gameboard() {
  const { players, boardSize, turn } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  useEffect(() => {
    if (!turn) {
      const newPlayers = shuffledPlayers(players);
      dispatch({
        type: 'CHANGE_TURN',
        value: newPlayers[0].id,
      });
    }
  }, [players, dispatch]);

  const onClick = (e: React.MouseEvent<HTMLTableElement>) => {
    const target = e.target as HTMLElement;
    target.innerHTML = `<p style="color: ${players[turn!].color}; text-align : center">
        ${marks.find(({ name }) => name === players[turn!].mark)?.mark ?? ''}
      </p>`;

    changeTurn();
  };

  const changeTurn = () => {
    dispatch({
      type: 'CHANGE_TURN',
      value: turn ?? shuffledPlayers(players)[0].id,
    });
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
                  return <Cell id={`[${rowIdx}][${cellIdx}]`} key={`cell ${cellIdx}`} />;
                })}
              </>
            }
          </Row>
        );
      }),
    [board]
  );

  return (
    <>
      <MainButton />
      <Player />
      <table className="game-board" onClick={onClick}>
        <tbody>{Cells}</tbody>
      </table>
    </>
  );
}
