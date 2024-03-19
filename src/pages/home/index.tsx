import { useState } from 'react';
import './styles/home.css';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const onClickStartGame = () => {};

  return (
    <div className="game-board">
      <div className="buttons">
        <button className="button button--start" onClick={onClickStartGame}>
          게임 시작
        </button>
        <button className="button button--record">기록</button>
      </div>
    </div>
  );
}
