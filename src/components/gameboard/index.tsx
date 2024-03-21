import { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import './styles/gameboard.css';

import Cell from './Cell';
import Row from './Row';
import MainButton from '../mainButton';

import { GameActionsContext, GameValueContext } from '@/store/contextAPI/GameProvider';

import { createBoard } from './utils/createBoard';
import { shuffledPlayers } from './utils/shuffledPlayers';
import { checkWin } from './utils/checkWin';
import { checkDraw } from './utils/checkDraw';

import GameTimer from '../gameTimer';
import type { Player } from '../player/types/player';
import PlayerComponent from '../player/Player';
import GameResult from '../gameResult';

// TODO 히스토리 전역 상태로 리팩토링, board도 gameMap 전역 상태로 변경해야함
export default function Gameboard() {
  const { players, boardSize, turn, winningCondition } = useContext(GameValueContext);
  const dispatch = useContext(GameActionsContext);

  const [board, setBoard] = useState(() => createBoard(boardSize, boardSize));
  const [history, setHistory] = useState<number[][]>([]);
  const [isUndoUsed, setIsUndoUsed] = useState(false);

  const [winner, setWinner] = useState<Player['id']>();
  const [gameOver, setGameOver] = useState(false);

  console.log(players);

  // TODO 중복 로직 제거 필요

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

    const [row, col] = target.id.split(',').map(Number);

    if (board[row][col] !== null) return;

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[row][col] = turn;
      return newBoard;
    });

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push([row, col]);

      return newHistory;
    });

    // 우승자, 무승부 체크
    const newBoard = [...board];
    newBoard[row][col] = turn;

    const hasWinner = checkWin(newBoard, players[turn!].id, winningCondition);

    if (hasWinner) {
      toast.success(`우승자는 플레이어 ${players[turn!].id + 1}입니다.`);
      setWinner(players[turn!].id);
      setGameOver(true);
    }

    const isDraw = checkDraw(newBoard);
    if (!hasWinner && isDraw) {
      toast('무승부입니다.');
      setGameOver(true);
    }

    setIsUndoUsed(false);

    changeTurn();
  };

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

  const Cells = useMemo(
    () =>
      board.map((row, rowIdx) => {
        return (
          <Row key={`row ${rowIdx}`}>
            {
              <>
                {row.map((_, cellIdx) => {
                  return (
                    <Cell
                      style={{ color: players[board[rowIdx][cellIdx]]?.color }}
                      id={`${rowIdx},${cellIdx}`}
                      key={`cell ${cellIdx}`}
                    >
                      {players[board[rowIdx][cellIdx]]?.markSymbol}
                    </Cell>
                  );
                })}
              </>
            }
          </Row>
        );
      }),
    [board, players]
  );

  const updateHistory = (row: number, col: number) => {
    setHistory((prevHistory) => [...prevHistory, [row, col]]);
    setIsUndoUsed(false);

    // 우승자, 무승부 체크

    const hasWinner = checkWin(board, players[turn!].id, winningCondition);
    if (hasWinner) {
      toast.success(`우승자는 플레이어 ${players[turn!].id + 1}입니다.`);
      setWinner(players[turn!].id);
      setGameOver(true);
    }

    const isDraw = checkDraw(board);
    if (!hasWinner && isDraw) {
      toast('무승부입니다.');
      setGameOver(true);
    }
  };

  return (
    <>
      <MainButton />
      {/* {gameOver ? (
        <GameResult board={board} winner={winner} history={history} />
      ) : ( */}
      <>
        <GameTimer board={board} setBoard={setBoard} updateHistory={updateHistory} />
        <p className="player-turn">
          <strong>{turn! + 1}번 플레이어</strong> 차례입니다.{' '}
        </p>

        <PlayerComponent />

        <table className="game-board" onClick={onClick}>
          <tbody>{Cells}</tbody>
        </table>

        <button
          className="button button--undo"
          disabled={history.length <= 0}
          onClick={onClickUndo}
        >
          무르기
        </button>
      </>
      {/* )} */}
    </>
  );
}
