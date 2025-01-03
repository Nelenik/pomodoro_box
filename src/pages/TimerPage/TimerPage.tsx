import './timerPage.scss';
// import { FC } from 'react';
import useDocTitle from '@/hooks/useDocTitle';
import { TaskForm } from '@/components/TaskForm';
import { TasksList } from '@/components/TasksList';
import { Timer } from '@/components/Timer';

import TomatoMainSvg from 'assets/tomato-main.svg?react'
import { getTasksTimeString } from '@/utils/getTimeString';
import { useSettings } from '@/reducers_providers/SettingsProvider/useSettings';
import { ActiveTaskProvider } from '@/reducers_providers/ActiveTaskProvider';
import { useTasksList } from '@/reducers_providers/TasksListProvider';
// import { TimerComponent } from '@/components/TimerComponent';

export const TimerPage = () => {
    useDocTitle();
    const filteredList = useTasksList()
    const { appSettings } = useSettings()

    const tomatoesTotal = filteredList.reduce((prev, { tomatoesCount }) => prev + tomatoesCount
        , 0)

    return (
        <ActiveTaskProvider>
            <div className='container TimerPage'>
                <div className="TimerPage__Descr Descr">
                    <h1 className='mg-reset Descr__Title'>Hooray! Now you can start working:</h1>
                    <ul className='Descr__List'>
                        <li className='Descr__Item'>
                            Write down the name of the current task
                        </li>
                        <li className='Descr__Item'>
                            Start the timer (“pomodoro”)
                        </li>
                        <li className='Descr__Item'>
                            Work until the “pomodoro” rings
                        </li>
                        <li className='Descr__Item'>
                            Take a short break (3-5 minutes)
                        </li>
                        <li className='Descr__Item'>
                            Keep working “pomodoro” by “pomodoro” until the task is completed. Every 4 “pomodoros,” take a longer break (15-30 minutes)
                        </li>
                    </ul>
                </div>
                <div className="TimerPage__Timer">
                    {(filteredList.length > 0) ?
                        <Timer currentTask={filteredList[0]} /> :
                        <TomatoMainSvg className='SpeakingTomato' />}
                </div>
                <TaskForm additCssClass='TimerPage__Form' />
                <div className="TimerPage__Tasks">
                    <TasksList additCssClass='TimerPage__List' tasksList={filteredList} />
                    <div className="TimerPage__TotalSum">
                        {
                            (filteredList.length > 0)
                            && getTasksTimeString(tomatoesTotal * appSettings.tomatoDuration)
                        }
                    </div>
                </div>
            </div>
        </ActiveTaskProvider>
    )
}
