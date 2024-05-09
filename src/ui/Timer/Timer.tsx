import { Button } from '../buttons/Button';
import { RoundBtn } from '../buttons/RoundBtn';
import './timer.scss';
import { useTimerTick } from '../../hooks/useTimerTick';
import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useSettingsContext } from '@/reducers_providers/SettingsProvider';

//get control buttons depending on the timer state
interface ButtonSettings {
    view?: 'green' | 'red' | 'inactive' | 'redFull',
    inner: ReactElement | string,
    handler?: () => void
}
const getBtns = (startBtn: ButtonSettings, stopBtn: ButtonSettings): ReactNode => {
    return (
        <>
            <Button view={startBtn.view} handler={startBtn.handler}>
                {startBtn.inner}
            </Button>
            <Button view={stopBtn.view} handler={stopBtn.handler}>
                {stopBtn.inner}
            </Button>
        </>
    )
}

//timer component
interface TimerState {
    isStarted: boolean,
    isPaused: boolean,
}

type TimerType = 'workTimer' | 'shortBreakTimer' | 'longBreakTimer'

export const Timer = () => {
    const { appSettings } = useSettingsContext();
    const { tomatoDuration, shortBreakDuration, longBreakDuration } = appSettings;
    //tomato duration = workDurationRef.current, if it is changed, this value become default for the entire cycle(one cycle ends after a long break)
    const workDurationRef = useRef(tomatoDuration)
    const timerCycleRef = useRef<number>(0);
    console.log(timerCycleRef.current)

    const { isFinished, timeString, startTimer, pauseTimer, resetTimer } = useTimerTick(workDurationRef.current);


    const [timerType, setTimerType] = useState<TimerType>('workTimer');

    const [timerState, setTimerState] = useState<TimerState>({
        isStarted: false,
        isPaused: false,
    })
    const isWorkTimer = timerType === 'workTimer'
    const isShortBreakTimer = timerType === 'shortBreakTimer'
    const isLongBreakTimer = timerType === 'longBreakTimer'
    const { isStarted, isPaused } = timerState;


    //css modificator depending on timer type
    const timerCssModificator =
        (isWorkTimer && isStarted && 'Timer--working')
        || ((isShortBreakTimer || isLongBreakTimer) && isStarted && 'Timer--breaking')
        || '';

    // manage timer functions
    const switchTimerType = useCallback((type: TimerType, newTime: number) => {
        setTimerType(type)
        resetTimer(newTime);
    }, [resetTimer])

    const start = useCallback(() => {
        startTimer()
        setTimerState({ isStarted: true, isPaused: false })
    }, [startTimer])

    const pause = () => {
        pauseTimer()
        setTimerState({ isStarted: true, isPaused: true })
    }

    const skip = () => {
        pauseTimer();
        switchTimerType('workTimer', workDurationRef.current);
        start()
    }

    const resetToDefault = useCallback(() => {
        pauseTimer()
        setTimerState({ isStarted: false, isPaused: false })
        setTimerType('workTimer');
        resetTimer(tomatoDuration)
        timerCycleRef.current = 0;
        workDurationRef.current = tomatoDuration

    }, [resetTimer, tomatoDuration, pauseTimer])

    const done = () => {
        resetToDefault()

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
            start()
        }
        if (isFinished && isShortBreakTimer) {
            switchTimerType('workTimer', workDurationRef.current)
            start()

        }
        if (isFinished && isLongBreakTimer) {
            resetToDefault()
        }
    }, [timerType, isFinished, isWorkTimer, isLongBreakTimer, isShortBreakTimer, start, shortBreakDuration, longBreakDuration, tomatoDuration, resetTimer, resetToDefault, switchTimerType])

    const renderControlBtns = () => {
        switch (true) {
            case isWorkTimer && isPaused: {
                return getBtns(
                    { inner: 'Продолжить', handler: start },
                    { view: 'red', inner: 'Сделано', handler: done }
                )
            }
            case isWorkTimer && isStarted: {
                return getBtns(
                    { inner: 'Пауза', handler: pause },
                    { view: 'red', inner: "Стоп", handler: resetToDefault }
                )
            }
            case isWorkTimer: {
                return getBtns(
                    { inner: 'Старт', handler: start },
                    { view: 'inactive', inner: 'Стоп' }
                )
            }
            case isShortBreakTimer && isPaused: {
                return getBtns(
                    { inner: 'Продолжить', handler: start },
                    { view: 'red', inner: 'Пропустить', handler: skip }
                )
            }
            case isShortBreakTimer && isStarted: {
                return getBtns(
                    { inner: 'Пауза', handler: pause },
                    { view: 'red', inner: 'Пропустить', handler: skip }
                )
            }
            case isLongBreakTimer && isPaused: {
                return getBtns(
                    { inner: 'Продолжить', handler: start },
                    { view: 'red', inner: 'Пропустить', handler: resetToDefault }
                )
            }
            case isLongBreakTimer && isStarted: {
                return getBtns(
                    { inner: 'Пауза', handler: pause },
                    { view: 'red', inner: 'Пропустить', handler: resetToDefault }
                )
            }
        }
    }

    return (
        <div className={`Timer ${timerCssModificator} ${isPaused && 'Timer--paused' || ''}`}>
            <div className="Timer__Header">
                <h2 className="mg-reset Timer__TaskName">
                    Сверсать сайт
                </h2>
                <span className="Timer__TomatoCounter">
                    Помидор 1
                </span>
            </div>
            <div className="Timer__TimeBlock">
                <div className="Timer__Time">
                    {timeString}
                </div>
                <RoundBtn
                    {...isStarted && { view: 'inactive' }}
                    handler={() => {
                        workDurationRef.current += 5
                        resetTimer(workDurationRef.current)
                    }
                    }
                />
            </div>
            <p className="Timer__Descr">
                <span>Задача 1 - </span>
                Сверстать сайт
            </p>
            <div className="Timer__Controls">
                {renderControlBtns()}
            </div>
        </div>
    )
}