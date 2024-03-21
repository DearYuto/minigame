import { useCallback, useEffect, useState } from 'react';

export const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const resetTimer = useCallback(() => setTime(initialTime), [initialTime]);

  return { time, resetTimer };
};
