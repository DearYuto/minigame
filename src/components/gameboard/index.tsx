import { useContext, useEffect, useMemo, useState } from 'react';

import './styles/gameboard.css';

import Cell from './Cell';
import Row from './Row';
import Player from '../player/Player';
import MainButton from '../mainButton';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { createBoard } from './utils/createBoard';
import { shuffledPlayers } from './utils/shuffledPlayers';
import { toast } from 'react-toastify';
import { checkWin } from './utils/checkWin';

export default function Gameboard() {
  const { players, boardSize, turn, winningCondition } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  const [board, setBoard] = useState(() => createBoard(boardSize, boardSize));
  const [history, setHistory] = useState<number[][]>([]);
  const [isUndoUsed, setIsUndoUsed] = useState(false);

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

    const [row, cell] = target.id.split(',').map(Number);

    if (board[row][cell] !== null) return;

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[row][cell] = turn;
      return newBoard;
    });

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push([row, cell]);

      return newHistory;
    });

    // 우승자 체크
    const newBoard = [...board];
    newBoard[row][cell] = turn;
    const hasWinner = checkWin(newBoard, players[turn!].id, winningCondition);

    if (hasWinner) {
      toast.success(`우승자는 플레이어 ${players[turn!].id + 1}입니다.`);
    }

    setIsUndoUsed(false);

    changeTurn();
  };

  console.log({ history, board, players });

  const changeTurn = () => {
    dispatch({
      type: 'CHANGE_TURN',
      value: turn ?? shuffledPlayers(players)[0].id,
    });
  };

  const onClickUndo = () => {
    if (history.length === 0) return;

    if (isUndoUsed) {
      toast.error('무르기를 이미 사용했어요.');
      return;
    }

    if (players[turn!].undoLimit <= 0) {
      toast.error('무르기를 더이상 사용할 수 없어요.');
      return;
    }

    const newHistory = history.slice(0, history.length - 1);
    const lastMove = history[history.length - 1];

    setHistory(() => newHistory);
    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      newBoard[lastMove[0]][lastMove[1]] = null;
      return newBoard;
    });

    setIsUndoUsed(true);

    dispatch({
      type: 'CHANGE_UNDO',
      value: {
        id: turn!,
        undoLimit: players[turn!].undoLimit - 1,
      },
    });
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
                  return (
                    <Cell id={`${rowIdx},${cellIdx}`} key={`cell ${cellIdx}`}>
                      {board[rowIdx][cellIdx]}
                    </Cell>
                  );
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
      <button disabled={history.length <= 0} onClick={onClickUndo}>
        무르기
      </button>
    </>
  );
}
