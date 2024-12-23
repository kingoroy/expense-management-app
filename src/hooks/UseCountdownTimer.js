import { useState, useEffect } from 'react';

/**
 * A custom hook that provides a countdown timer.
 * @param {number} initialTime - The starting time for the countdown (in seconds).
 * @returns {number} - The current time of the countdown.
 */
const useCountdownTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return time;
};

export default useCountdownTimer;
