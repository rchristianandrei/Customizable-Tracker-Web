import { useCallback, useMemo, useRef, useState } from "react";

export const useStopwatch = () => {
  const [start, setStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const handleStart = useCallback(() => {
    if (start) return;

    setStart(true);
    startTimeRef.current = Date.now() - elapsedTime;

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedTime(Date.now() - startTimeRef.current);
      }
    }, 1000);
  }, [start, elapsedTime, startTimeRef, intervalRef]);

  const handleReset = useCallback(() => {
    setStart(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setElapsedTime(0);
    startTimeRef.current = null;
  }, [intervalRef, startTimeRef]);

  const clean = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [intervalRef]);

  const formatTime = useMemo((): string => {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [elapsedTime]);

  return {
    start,
    formatTime,
    handleStart,
    handleReset,
    clean,
  };
};
