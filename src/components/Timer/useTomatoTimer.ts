import { useTimerTick } from "@/hooks/useTimerTick";
import { useActiveTaskContext } from "@/reducers_providers/ActiveTaskProvider";
import { useSettingsContext } from "@/reducers_providers/SettingsProvider";
import { useRef, useState, useCallback, useEffect } from "react";
import { useTomatoMetriks } from "../../hooks/useTomatoMetriks";
import { useDispatchTasks } from "@/reducers_providers/TasksListProvider";
import { Task } from "@/types";

//timer component
interface TimerState {
  isStarted: boolean;
  isPaused: boolean;
}

type TimerType = "workTimer" | "shortBreakTimer" | "longBreakTimer";

const INCREASE_VALUE = 5;
const WORKING_PERIODS_COUNT = 4;
const ONDONE_ANIM_TIME = 1600;

export const useTomatoTimer = (currentTask: Task) => {
  const { todayMetriks, dispatchMetriks } = useTomatoMetriks();
  const dispatchTasks = useDispatchTasks();
  const { appSettings } = useSettingsContext();
  const { tomatoDuration, shortBreakDuration, longBreakDuration } = appSettings;

  //tomato duration = workDurationRef.current, if it is changed, this value become default for the entire cycle(one cycle ends after a long break)
  const workDurationRef = useRef(tomatoDuration);
  const timerCycleRef = useRef<number>(0);
  //link to active task element
  const activeTaskElRef = useActiveTaskContext();

  const { isFinished, timeString, startTimer, pauseTimer, resetTimer } =
    useTimerTick(workDurationRef.current);

  const [timerType, setTimerType] = useState<TimerType>("workTimer");

  const [timerState, setTimerState] = useState<TimerState>({
    isStarted: false,
    isPaused: false,
  });

  const pauseInitTimestamp = useRef(0);
  const workInitTimestamp = useRef(0);

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
    if (!isStarted && !isPaused) {
      workInitTimestamp.current = performance.now();
    }
    if (isStarted && isPaused) {
      dispatchMetriks({
        type: "RENEW_TIME_MEASURES",
        fieldName: "timeOnPause",
        initTimestamp: pauseInitTimestamp.current,
      });
      pauseInitTimestamp.current = 0;
    }
    startTimer();
    setTimerState({ isStarted: true, isPaused: false });
  }, [startTimer, isPaused, isStarted, dispatchMetriks]);

  //handle timer pause
  const handlePause = () => {
    pauseInitTimestamp.current = performance.now();
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
    dispatchMetriks({
      type: "RENEW_TIME_MEASURES",
      fieldName: "totalTime",
      initTimestamp: workInitTimestamp.current,
    });
    switchTimerType("workTimer", tomatoDuration);
    timerCycleRef.current = 0;
    workDurationRef.current = tomatoDuration;
  }, [switchTimerType, tomatoDuration, pauseTimer, dispatchMetriks]);

  //mark a task as done, handler
  const handleDone = useCallback(() => {
    handleResetToDefault();
    dispatchMetriks({
      type: "REWRITE_METRIKS",
      toChange: {
        completedTomatoes: ++todayMetriks.completedTomatoes,
        completedTasks: ++todayMetriks.completedTasks,
      },
    });

    //set animation
    activeTaskElRef.current?.classList.add("TaskItem--done");
    setTimeout(() => {
      dispatchTasks({
        type: "CHANGE_TASK",
        id: currentTask.id,
        toChange: {
          tomatoesCount: 0,
          timeOnTask: currentTask.timeOnTask + workDurationRef.current,
        },
      });
    }, ONDONE_ANIM_TIME);
  }, [
    handleResetToDefault,
    activeTaskElRef,
    todayMetriks,
    dispatchMetriks,
    currentTask,
    dispatchTasks,
  ]);

  //handle timer stop
  const handleStop = () => {
    handleResetToDefault();
    dispatchMetriks({
      type: "REWRITE_METRIKS",
      toChange: { stopCount: ++todayMetriks.stopCount },
    });
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
            const newTomatoesCount = currentTask.tomatoesCount - 1;
            const actualTomatoesCount =
              newTomatoesCount <= 0 ? 0 : newTomatoesCount;
            if (actualTomatoesCount === 0) {
              handleDone();
            } else {
              // set completed tomatoes
              dispatchMetriks({
                type: "REWRITE_METRIKS",
                toChange: {
                  completedTomatoes: ++todayMetriks.completedTomatoes,
                },
              });

              //rewrite tasks list
              dispatchTasks({
                type: "CHANGE_TASK",
                id: currentTask.id,
                toChange: {
                  tomatoesCount: actualTomatoesCount,
                  timeOnTask: currentTask.timeOnTask + workDurationRef.current,
                },
              });
              //switch break timer depending on timer cycle
              ++timerCycleRef.current;
              if (timerCycleRef.current >= WORKING_PERIODS_COUNT) {
                switchTimerType("longBreakTimer", longBreakDuration);
              } else {
                switchTimerType("shortBreakTimer", shortBreakDuration);
              }
              handleStart();
            }
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
    todayTaskNumber: todayMetriks.completedTasks,
    todayTomatoNumber: todayMetriks.completedTomatoes,
    timeString,
    timerType,
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