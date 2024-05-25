import { getTimerTimeString } from "@/utils/getTimeString";
import { useState, useEffect, useCallback } from "react";
import { useInterval } from "./useInterval/useInterval";

export const useTimerTick = (initValue: number) => {
  const [timerValue, setTimerValue] = useState(initValue);

  const [isRunning, setIsRunning] = useState(false);
  const delay = isRunning ? 1000 : null;
  console.log(delay);

  const tickFunc = () => {
    console.log("tick");
    setTimerValue((prev) => prev - 1);
  };

  useInterval(tickFunc, delay, "worker");

  useEffect(() => {
    if (timerValue < 0) {
      setTimerValue(0);
      setIsRunning(false);
    }
  }, [timerValue]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(
    (valueInSec: number = initValue) => {
      setTimerValue(valueInSec);
    },
    [initValue]
  );

  const timeString = getTimerTimeString(timerValue);
  console.log(timerValue);

  return {
    isFinished: timerValue < 0,
    timeString: timeString,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
