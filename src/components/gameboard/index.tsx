import { useContext, useEffect, useMemo, useState } from 'react';

import './styles/gameboard.css';

import Cell from './Cell';
import Row from './Row';
import Player from '../player/Player';
import { marks } from '../player/constants/player';
import MainButton from '../mainButton';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { createBoard } from './utils/createBoard';
import { shuffledPlayers } from './utils/shuffledPlayers';

export default function Gameboard() {
  const { players, boardSize, turn } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  const [board, setBoard] = useState(() => createBoard(boardSize, boardSize));

  console.log(board);

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

    if (target.tagName !== 'TD' || target.children.length > 0) return;

    target.innerHTML = `<p style="color: ${players[turn!].color}; text-align : center">
        ${marks.find(({ name }) => name === players[turn!].mark)?.mark ?? ''}
      </p>`;

    const [row, cell] = target.id.split(',').map(Number);

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[row][cell] = turn;
      return newBoard;
    });

    changeTurn();
  };

  const changeTurn = () => {
    dispatch({
      type: 'CHANGE_TURN',
      value: turn ?? shuffledPlayers(players)[0].id,
    });
  };

  const checkWinCondition = () => {
    // 승리 조건 체크
  };

  // 더 둘곳 없는지 없으면 무승부로 체크하는 로직 추가

  const Cells = useMemo(
    () =>
      board.map((row, rowIdx) => {
        return (
          <Row key={`row ${rowIdx}`}>
            {
              <>
                {row.map((_, cellIdx) => {
                  return <Cell id={`${rowIdx},${cellIdx}`} key={`cell ${cellIdx}`} />;
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
