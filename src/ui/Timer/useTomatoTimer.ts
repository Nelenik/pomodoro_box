import { useTimerTick } from "@/hooks/useTimerTick";
import { useActiveTaskContext } from "@/reducers_providers/ActiveTaskProvider";
import { useSettingsContext } from "@/reducers_providers/SettingsProvider";
import { useRef, useState, useCallback, useEffect } from "react";
import { useTomatoMetriks } from "./useTomatoMetriks";
import { ManageTasksAction, Task } from "@/types";

//timer component
interface TimerState {
  isStarted: boolean;
  isPaused: boolean;
}

type TimerType = "workTimer" | "shortBreakTimer" | "longBreakTimer";

const INCREASE_VALUE = 5;

export const useTomatoTimer = (
  currentTask: Task,
  dispatchTasks: React.Dispatch<ManageTasksAction>
) => {
  const { todayMetriks, setTodayMetriks } = useTomatoMetriks();

  const { appSettings } = useSettingsContext();
  const { tomatoDuration, shortBreakDuration, longBreakDuration } = appSettings;

  //tomato duration = workDurationRef.current, if it is changed, this value become default for the entire cycle(one cycle ends after a long break)
  const workDurationRef = useRef(tomatoDuration);
  const timerCycleRef = useRef<number>(0);

  const { isFinished, timeString, startTimer, pauseTimer, resetTimer } =
    useTimerTick(workDurationRef.current);

  const [timerType, setTimerType] = useState<TimerType>("workTimer");

  const [timerState, setTimerState] = useState<TimerState>({
    isStarted: false,
    isPaused: false,
  });

  const activeTaskElRef = useActiveTaskContext();

  const isWorkTimer = timerType === "workTimer";
  const isShortBreakTimer = timerType === "shortBreakTimer";
  const isLongBreakTimer = timerType === "longBreakTimer";
  const { isStarted, isPaused } = timerState;

  // manage timer functions

  //switch timer type func
  const switchTimerType = useCallback(
    (type: TimerType, newTime: number) => {
      setTimerType(type);
      resetTimer(newTime);
    },
    [resetTimer]
  );

  //handle timer start
  const handleStart = useCallback(() => {
    startTimer();
    setTimerState({ isStarted: true, isPaused: false });
  }, [startTimer]);

  //handle timer pause
  const handlePause = () => {
    pauseTimer();
    setTimerState({ isStarted: true, isPaused: true });
  };

  //handle skipping the break
  const handleSkip = () => {
    pauseTimer();
    switchTimerType("workTimer", workDurationRef.current);
    handleStart();
  };

  //reset timer to default state
  const handleResetToDefault = useCallback(() => {
    pauseTimer();
    setTimerState({ isStarted: false, isPaused: false });
    switchTimerType("workTimer", tomatoDuration);
    timerCycleRef.current = 0;
    workDurationRef.current = tomatoDuration;
  }, [switchTimerType, tomatoDuration, pauseTimer]);

  //mark a task as done, handler
  const handleDone = useCallback(() => {
    handleResetToDefault();
    activeTaskElRef.current?.classList.add("TaskItem--done");
    setTodayMetriks({
      ...todayMetriks,
      completedTomatoes: ++todayMetriks.completedTomatoes,
      completedTasks: ++todayMetriks.completedTasks,
    });
    setTimeout(() => {
      dispatchTasks({
        type: "CHANGE_TASK",
        id: currentTask.id,
        toChange: {
          done: true,
          timeOnTask: currentTask.timeOnTask + workDurationRef.current,
        },
      });
    }, 1700);
  }, [
    handleResetToDefault,
    activeTaskElRef,
    dispatchTasks,
    currentTask,
    todayMetriks,
    setTodayMetriks,
  ]);

  //handle timer stop
  const handleStop = () => {
    handleResetToDefault();

    setTodayMetriks({ ...todayMetriks, stopCount: ++todayMetriks.stopCount });
  };

  //handle  work time increasing
  const handleIncreaseTime = () => {
    workDurationRef.current += INCREASE_VALUE;
    resetTimer(workDurationRef.current);
  };

  //switch timer type, effect
  useEffect(() => {
    if (isFinished) {
      switch (timerType) {
        case "workTimer":
          {
            // set completed tomatoes
            setTodayMetriks({
              ...todayMetriks,
              completedTomatoes: ++todayMetriks.completedTomatoes,
            });
            //rewrite tasks list
            dispatchTasks({
              type: "CHANGE_TASK",
              id: currentTask.id,
              toChange: {
                tomatoesCount: --currentTask.tomatoesCount,
                timeOnTask: currentTask.timeOnTask + workDurationRef.current,
              },
            });

            //switch break timer depending on timer cycle
            ++timerCycleRef.current;
            if (timerCycleRef.current >= 4) {
              switchTimerType("longBreakTimer", longBreakDuration);
            } else {
              switchTimerType("shortBreakTimer", shortBreakDuration);
            }
            handleStart();
          }
          break;
        case "shortBreakTimer":
          {
            switchTimerType("workTimer", workDurationRef.current);
            handleStart();
          }
          break;
        case "longBreakTimer":
          {
            handleResetToDefault();
          }
          break;
      }
    }
  });

  return {
    timeString,
    isWorkTimer,
    isShortBreakTimer,
    isLongBreakTimer,
    isStarted,
    isPaused,
    handleDone,
    handleIncreaseTime,
    handlePause,
    handleResetToDefault,
    handleSkip,
    handleStart,
    handleStop,
  };
};
