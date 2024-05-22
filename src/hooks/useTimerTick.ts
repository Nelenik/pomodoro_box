import { getTimerTimeString } from "@/utils/getTimeString";
import { useState, useRef, useCallback } from "react";

export const useTimerTick = (initValue: number) => {
  const [timerValue, setTimerValue] = useState(initValue);
  const timeString = getTimerTimeString(timerValue);
  const intervalRef = useRef(0);

  if (timerValue < 0) {
    clearInterval(intervalRef.current);
  }

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => prev - 1);
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  const resetTimer = useCallback(
    (valueInSec: number = initValue): void => {
      setTimerValue(valueInSec);
    },
    [initValue]
  );

  return {
    isFinished: timerValue < 0,
    timeString,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
