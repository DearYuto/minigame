import { useEffect, useState } from 'react';

import Row from '../gameboard/Row';
import Cell from '../gameboard/Cell';

import type { Player } from '../player/types/player';

import './styles/gameHistory.css';

export default function GameHistory() {
  const [histories, setHistories] = useState<
    Array<{
      winnerId: number;
      board: Array<Array<number | null>>;
      history: Array<[number, number]>;
      players: Player[];
    }>
  >([]);

  useEffect(() => {
    const savedGameResults = JSON.parse(localStorage.getItem('gameHistory') ?? '[]');
    setHistories([savedGameResults]);
  }, []);

  if (histories.toString().length === 0) {
    return <h3>NO DATA</h3>;
  }

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {histories !== undefined || histories !== null ? (
        histories?.map((game, gameIndex) => (
          <div key={gameIndex}>
            {game.winnerId !== null && game.winnerId !== undefined ? (
              <div className="game-history__winner">
                <h3>✨ winner ✨</h3>
                <p>플레이어 {game.winnerId + 1}</p>
                <p>마크 : {game.players[game.winnerId].markSymbol}</p>
                <p>컬러 : {game.players[game.winnerId].color}</p>
              </div>
            ) : (
              <p>무승부</p>
            )}

            <table className="game-board">
              <tbody>
                {game?.board?.map((row, rowIdx) => (
                  <Row key={rowIdx}>
                    {row.map((cell, cellIdx) => {
                      const moveIndex = game.history.findIndex(
                        (h) => h[0] === rowIdx && h[1] === cellIdx
                      );
                      const playerMark = cell !== null ? game.players[cell]?.markSymbol : '';
                      const playerColor = cell !== null ? game.players[cell]?.color : '';

                      return (
                        <Cell id={`${rowIdx},${cellIdx}`} key={cellIdx}>
                          <p style={{ color: playerColor }}>{playerMark}</p>
                          <span>{moveIndex !== -1 ? `${moveIndex + 1}` : ''}</span>
                        </Cell>
                      );
                    })}
                  </Row>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>게임 히스토리가 존재하지 않습니다.</p>
      )}
    </div>
  );
}
