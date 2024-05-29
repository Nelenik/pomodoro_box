import { Button } from '../buttons/Button';
import { RoundBtn } from '../buttons/RoundBtn';
import './timer.scss';
import { FC, ReactElement, ReactNode } from 'react';
import { useTomatoTimer } from '.';
import { Task } from '@/types';

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

interface TimerProps {
    currentTask: Task;
}

export const Timer: FC<TimerProps> = ({ currentTask }) => {
    const {
        todayTaskNumber,
        todayTomatoNumber,
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
        handleStop
    } = useTomatoTimer(currentTask)

    const isWorkTimer = timerType === "workTimer";
    const isShortBreakTimer = timerType === "shortBreakTimer";
    const isLongBreakTimer = timerType === "longBreakTimer";

    //css modificator depending on timer type
    const timerCssModificator =
        (isWorkTimer && isStarted && 'Timer--working')
        || ((isShortBreakTimer || isLongBreakTimer) && isStarted && 'Timer--breaking')
        || '';


    const renderControlBtns = () => {
        switch (true) {
            case isWorkTimer && isPaused: {
                return getBtns(
                    { inner: 'Продолжить', handler: handleStart },
                    { view: 'red', inner: 'Сделано', handler: handleDone }
                )
            }
            case isWorkTimer && isStarted: {
                return getBtns(
                    { inner: 'Пауза', handler: handlePause },
                    { view: 'red', inner: "Стоп", handler: handleStop }
                )
            }
            case isWorkTimer: {
                return getBtns(
                    { inner: 'Старт', handler: handleStart },
                    { view: 'inactive', inner: 'Стоп' }
                )
            }
            case isShortBreakTimer && isPaused: {
                return getBtns(
                    { inner: 'Продолжить', handler: handleStart },
                    { view: 'red', inner: 'Пропустить', handler: handleSkip }
                )
            }
            case isShortBreakTimer && isStarted: {
                return getBtns(
                    { inner: 'Пауза', handler: handlePause },
                    { view: 'red', inner: 'Пропустить', handler: handleSkip }
                )
            }
            case isLongBreakTimer && isPaused: {
                return getBtns(
                    { inner: 'Продолжить', handler: handleStart },
                    { view: 'red', inner: 'Пропустить', handler: handleResetToDefault }
                )
            }
            case isLongBreakTimer && isStarted: {
                return getBtns(
                    { inner: 'Пауза', handler: handlePause },
                    { view: 'red', inner: 'Пропустить', handler: handleResetToDefault }
                )
            }
        }
    }

    //calculate which tomato or task number is currently running (for drawing on the screen)
    const getExecActionNumber = (action: number): number => {
        if (isLongBreakTimer || isShortBreakTimer) return action;
        else if (isWorkTimer) return action + 1;
        else return 0;
    }

    return (
        <div className={`Timer ${timerCssModificator} ${isPaused && 'Timer--paused' || ''}`}>
            <div className="Timer__Header">
                <h2 className="mg-reset Timer__TaskName">
                    {currentTask.task}
                </h2>
                <span className="Timer__TomatoCounter">
                    Помидор {getExecActionNumber(todayTomatoNumber)}
                </span>
            </div>
            <div className="Timer__TimeBlock">
                <div className="Timer__Time">
                    {timeString}
                </div>
                <RoundBtn
                    // {...isStarted && { view: 'inactive' }}
                    handler={handleIncreaseTime}
                />
            </div>
            <p className="Timer__Descr">
                <span>Задача {getExecActionNumber(todayTaskNumber)} - </span>
                {currentTask.task}
            </p>
            <div className="Timer__Controls">
                {renderControlBtns()}
            </div>
        </div>
    )
}