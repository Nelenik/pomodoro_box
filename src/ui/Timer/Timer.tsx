import { Button } from '../buttons/Button';
import { RoundBtn } from '../buttons/RoundBtn';
import './timer.scss';
import { useTimer } from '../../hooks/useTimer';
import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { useSettingsContext } from '@/reducers_providers/SettingsProvider';
// import { TasksContext } from '@/types';
// import { useOutletContext } from 'react-router-dom';

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

type TimerType = 'workTimer' | 'breakTimer'

export const Timer = () => {
    const { appSettings } = useSettingsContext()
    const { isFinished, timeString, startTimer, pauseTimer, resetTimer } = useTimer(appSettings.tomatoDuration);

    const [timerType, setTimerType] = useState<TimerType>('workTimer');

    const [timerState, setTimerState] = useState<TimerState>({
        isStarted: false,
        isPaused: false,
    })
    const isWorkTimer = timerType === 'workTimer'
    const isBreakTimer = timerType === 'breakTimer'
    const { isStarted, isPaused } = timerState;

    const timerCssModificator =
        (isWorkTimer && isStarted && 'Timer--working')
        || (isBreakTimer && isStarted && 'Timer--breaking')
        || '';

    // manage timer functions
    const start = useCallback(() => {
        startTimer()
        setTimerState({ isStarted: true, isPaused: false })
    }, [startTimer])

    const pause = () => {
        pauseTimer()
        setTimerState({ isStarted: true, isPaused: true })
    }

    const stop = () => {
        pauseTimer()
        resetTimer()
        setTimerState({ isStarted: false, isPaused: false })
        setTimerType('workTimer')
    }

    const done = () => {
        stop()

    }
    //switch timer type
    useEffect(() => {
        if (isFinished && isWorkTimer) {
            setTimerType('breakTimer')
            resetTimer(appSettings.shortBreakDuration);
            start()
        }
        if (isFinished && isBreakTimer) {
            setTimerType('workTimer')
            resetTimer(appSettings.tomatoDuration);
            start()

        }
    }, [timerType, isFinished, isWorkTimer, isBreakTimer, start, appSettings.shortBreakDuration, appSettings.tomatoDuration, resetTimer])




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
                <RoundBtn />
            </div>
            <p className="Timer__Descr">
                <span>Задача 1 - </span>
                Сверстать сайт
            </p>
            <div className="Timer__Controls">
                {

                    (isWorkTimer && isPaused && getBtns(
                        {
                            inner: 'Продолжить',
                            handler: start
                        },
                        {
                            view: 'red',
                            inner: 'Сделано',
                            handler: done
                        }))
                    || (isWorkTimer && isStarted && getBtns(
                        {
                            inner: 'Пауза',
                            handler: pause
                        },
                        {
                            view: 'red',
                            inner: "Стоп",
                            handler: stop
                        }))
                    || (isWorkTimer && getBtns(
                        {
                            inner: 'Старт',
                            handler: start
                        },
                        {
                            view: 'inactive',
                            inner: 'Стоп'
                        }))
                    || (isBreakTimer && isPaused && getBtns(
                        {
                            inner: 'Продолжить',
                            handler: start
                        },
                        {
                            view: 'red',
                            inner: 'Пропустить',
                            handler: stop
                        }))
                    || (isBreakTimer && isStarted && getBtns(
                        {
                            inner: 'Пауза',
                            handler: pause
                        },
                        {
                            view: 'red',
                            inner: 'Пропустить',
                            handler: stop
                        }))

                }
            </div>
        </div>
    )
}