import { useTimerTick } from "@/hooks/useTimerTick";
import { useActiveTaskContext } from "@/reducers_providers/ActiveTaskProvider";
import { useSettingsContext } from "@/reducers_providers/SettingsProvider";
import { useRef, useState, useCallback, useEffect } from "react";

//timer component
interface TimerState {
  isStarted: boolean,
  isPaused: boolean,
}

type TimerType = 'workTimer' | 'shortBreakTimer' | 'longBreakTimer'

export const useTomatoTimer = () => {

  const { appSettings } = useSettingsContext();
  const { tomatoDuration, shortBreakDuration, longBreakDuration } = appSettings;

  //tomato duration = workDurationRef.current, if it is changed, this value become default for the entire cycle(one cycle ends after a long break)
  const workDurationRef = useRef(tomatoDuration)
  const timerCycleRef = useRef<number>(0);

  const { isFinished, timeString, startTimer, pauseTimer, resetTimer } = useTimerTick(workDurationRef.current);


  const [timerType, setTimerType] = useState<TimerType>('workTimer');

  const [timerState, setTimerState] = useState<TimerState>({
    isStarted: false,
    isPaused: false,
  })

  const activeTaskElRef = useActiveTaskContext()

  const isWorkTimer = timerType === 'workTimer'
  const isShortBreakTimer = timerType === 'shortBreakTimer'
  const isLongBreakTimer = timerType === 'longBreakTimer'
  const { isStarted, isPaused } = timerState;


  // manage timer functions
  const switchTimerType = useCallback((type: TimerType, newTime: number) => {
    setTimerType(type)
    resetTimer(newTime);
  }, [resetTimer])

  const handleStart = useCallback(() => {
    startTimer()
    setTimerState({ isStarted: true, isPaused: false })
  }, [startTimer])

  const handlePause = () => {
    pauseTimer()
    setTimerState({ isStarted: true, isPaused: true })
  }

  const handleSkip = () => {
    pauseTimer();
    switchTimerType('workTimer', workDurationRef.current);
    handleStart()
  }

  const handleResetToDefault = useCallback(() => {
    pauseTimer()
    setTimerState({ isStarted: false, isPaused: false })
    setTimerType('workTimer');
    resetTimer(tomatoDuration)
    timerCycleRef.current = 0;
    workDurationRef.current = tomatoDuration

  }, [resetTimer, tomatoDuration, pauseTimer])

  const handleDone = () => {
    handleResetToDefault()
    activeTaskElRef.current?.classList.add('TaskItem--done')
  }

  const handleIncreaseTime = () => {
    workDurationRef.current += 5
    resetTimer(workDurationRef.current)
  }
  //switch timer type
  useEffect(() => {
    if (isFinished && isWorkTimer) {
      ++timerCycleRef.current
      if (timerCycleRef.current >= 4) {
        switchTimerType('longBreakTimer', longBreakDuration)
      } else {
        switchTimerType('shortBreakTimer', shortBreakDuration)
      }
      handleStart()
    }
    if (isFinished && isShortBreakTimer) {
      switchTimerType('workTimer', workDurationRef.current)
      handleStart()

    }
    if (isFinished && isLongBreakTimer) {
      handleResetToDefault()
    }
  }, [timerType, isFinished, isWorkTimer, isLongBreakTimer, isShortBreakTimer, handleStart, shortBreakDuration, longBreakDuration, tomatoDuration, resetTimer, handleResetToDefault, switchTimerType])

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
    handleStart
  }
}