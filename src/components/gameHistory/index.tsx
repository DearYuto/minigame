import { useEffect, useState } from 'react';
import Row from '../gameboard/Row';
import Cell from '../gameboard/Cell';
import { Player } from '../player/types/player';

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

  if (histories.length <= 0) {
    return <p>NO DATA</p>;
  }

  return (
    <div>
      <h2>Game History</h2>
      {histories !== undefined ? (
        histories.map((game, gameIndex) => (
          <div key={gameIndex}>
            {game.winnerId !== null && game.winnerId !== undefined ? (
              <>
                <p>Winner: 플레이어 {game.winnerId + 1}</p>
                <p>마크 : {game.players[game.winnerId].markSymbol}</p>
                <p>컬러 : {game.players[game.winnerId].color}</p>
              </>
            ) : (
              <p>무승부</p>
            )}

            <table>
              <tbody>
                {game.board.map((row, rowIdx) => (
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
