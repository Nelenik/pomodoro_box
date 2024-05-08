import { getTimerTimeString } from "@/utils/getTimeString";
import { useState, useRef, useEffect } from "react";

export const useTimer = (initValue: number) => {
  const [timerValue, setTimerValue] = useState(initValue);
  const [isFinished, setIsFinished] = useState(false);
  const timeString = getTimerTimeString(timerValue);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (timerValue < 0) {
      clearInterval(intervalRef.current);
      setIsFinished(true);
    }
  }, [timerValue]);

  const startTimer = () => {
    isFinished && setIsFinished(false);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimerValue((prev) => --prev);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const resetTimer = (valueInSec: number = initValue): void => {
    setTimerValue(valueInSec);
    isFinished && setIsFinished(false);
  };

  return {
    isFinished,
    timeString,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
