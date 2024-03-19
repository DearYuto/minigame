import { useEffect, useState } from 'react';

import { GAME_RULE } from '@/constants/gameRule';

export default function GameTimer() {
  const [timer, setTimer] = useState<number>(GAME_RULE.timer);

  const resetTimer = () => {
    setTimer(GAME_RULE.timer);
  };
  // 현재 플레이어에서 턴 넘어갈 때 reset 시키기
  // 그러면 턴 넘기기 체크는 누구의 책임으로 ? -> 유틸 함수 만들어서 체크 ?

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1_000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{timer}</div>;
}
