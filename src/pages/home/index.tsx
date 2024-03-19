import { useState } from 'react';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const onClickStartGame = () => {};

  return (
    <div>
      <button>게임 시작</button>
      <button>기록</button>
    </div>
  );
}
