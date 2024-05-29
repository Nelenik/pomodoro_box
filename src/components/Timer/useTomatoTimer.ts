import { useTimerTick } from "@/hooks/useTimerTick";
import { useActiveTaskContext } from "@/reducers_providers/ActiveTaskProvider";
import { useSettings } from "@/reducers_providers/SettingsProvider";
import { useRef, useState, useCallback, useEffect, useReducer } from "react";
import { useTomatoMetriks } from "../../hooks/useTomatoMetriks";
import { useDispatchTasks } from "@/reducers_providers/TasksListProvider";
import { Task } from "@/types";
import { getTimerTimeString } from "@/utils/getTimeString";
//audio
import WorkFinishSound from "assets/bell.mp3";
import BreakFinishSound from "assets/bell-break-end.mp3";

// audio intstances
const workSound = new Audio(WorkFinishSound);
const breakSound = new Audio(BreakFinishSound);

//timer component
interface TimerState {
  isStarted: boolean;
  isPaused: boolean;
}

type TimerType = "workTimer" | "shortBreakTimer" | "longBreakTimer";

const INCREASE_VALUE = 60;
const ONDONE_ANIM_TIME = 1600;

const timerReducer = (
  state: TimerState,
  action: { type: "START" | "PAUSE" | "RESET" }
): TimerState => {
  switch (action.type) {
    case "START":
      return { ...state, isStarted: true, isPaused: false };
    case "PAUSE":
      return { ...state, isStarted: true, isPaused: true };
    case "RESET":
      return { ...state, isStarted: false, isPaused: false };
    default:
      return state;
  }
};

export const useTomatoTimer = (currentTask: Task) => {
  const { todayMetriks, dispatchMetriks } = useTomatoMetriks();
  const dispatchTasks = useDispatchTasks();
  const { appSettings } = useSettings();
  const {
    tomatoDuration,
    shortBreak,
    longBreak,
    audioSignal,
    workingPeriodsCount,
  } = appSettings;

  const timerCycleRef = useRef<number>(0);
  //link to active task element
  const activeTaskElRef = useActiveTaskContext();

  const { timerValue, startTimer, pauseTimer, resetTimer } =
    useTimerTick(tomatoDuration);

  const [timerType, setTimerType] = useState<TimerType>("workTimer");

  const [timerState, dispatchTimer] = useReducer(timerReducer, {
    isStarted: false,
    isPaused: false,
  });
  //restart timer on tomatoDuration changing
  useEffect(() => {
    resetTimer(tomatoDuration);
  }, [tomatoDuration, resetTimer]);

  const isFinished = timerValue < 0;

  //initial timestamps for time measuring
  const pauseInitTimestamp = useRef(0);
  const workInitTimestamp = useRef(0);

  const { isStarted, isPaused } = timerState;

  /* manage timer functions*/

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
    dispatchTimer({ type: "START" });
  }, [startTimer, isPaused, isStarted, dispatchMetriks]);

  //handle timer pause
  const handlePause = () => {
    pauseInitTimestamp.current = performance.now();
    pauseTimer();
    dispatchTimer({ type: "PAUSE" });
  };

  //handle skipping the break
  const handleSkip = () => {
    pauseTimer();
    switchTimerType("workTimer", tomatoDuration);
    handleStart();
  };

  //reset timer to default state
  const handleResetToDefault = useCallback(() => {
    pauseTimer();
    dispatchTimer({ type: "RESET" });
    dispatchMetriks({
      type: "RENEW_TIME_MEASURES",
      fieldName: "totalTime",
      initTimestamp: workInitTimestamp.current,
    });
    switchTimerType("workTimer", tomatoDuration);
    timerCycleRef.current = 0;
    // workDurationRef.current = tomatoDuration;
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
          timeOnTask: currentTask.timeOnTask + tomatoDuration,
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
    tomatoDuration,
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
    resetTimer(timerValue + INCREASE_VALUE);
  };

  //switch timer type, effect
  useEffect(() => {
    if (isFinished) {
      switch (timerType) {
        case "workTimer":
          {
            audioSignal && workSound.play();

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
                  timeOnTask: currentTask.timeOnTask + tomatoDuration,
                },
              });
              //switch break timer depending on timer cycle
              ++timerCycleRef.current;
              if (timerCycleRef.current >= workingPeriodsCount) {
                switchTimerType("longBreakTimer", longBreak);
              } else {
                switchTimerType("shortBreakTimer", shortBreak);
              }
              handleStart();
            }
          }
          break;
        case "shortBreakTimer":
          {
            audioSignal && breakSound.play();
            switchTimerType("workTimer", tomatoDuration);
            handleStart();
          }
          break;
        case "longBreakTimer":
          {
            audioSignal && breakSound.play();
            handleResetToDefault();
          }
          break;
      }
    }
  });

  return {
    todayTaskNumber: todayMetriks.completedTasks,
    todayTomatoNumber: todayMetriks.completedTomatoes,
    timeString: getTimerTimeString(timerValue),
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
