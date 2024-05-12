import { getTimerTimeString } from "@/utils/getTimeString";
import { useState, useRef } from "react";

export const useTimerTick = (initValue: number) => {
  const [timerValue, setTimerValue] = useState(initValue);
  const timeString = getTimerTimeString(timerValue);
  const intervalRef = useRef(0);

  if (timerValue < 0) {
    clearInterval(intervalRef.current);
  }

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => prev - 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const resetTimer = (valueInSec: number = initValue): void => {
    setTimerValue(valueInSec);
  };

  return {
    isFinished: timerValue < 0,
    timeString,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
