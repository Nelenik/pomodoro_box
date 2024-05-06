import './timerPage.scss';
// import { FC } from 'react';
import useDocTitle from '@/hooks/useDocTitle';
import { TaskForm } from '@/ui/TaskForm';
import { TasksList } from '@/ui/TasksList';
import { Timer } from '@/ui/Timer';

import TomatoMainSvg from 'assets/tomato-main.svg?react'
import { useOutletContext } from 'react-router-dom';
import { TasksContext } from '@/types';
import { getTasksTimeString } from '@/utils/getTimeString';
import { useSettingsContext } from '@/reducers_providers/SettingsProvider/useSettingsContext';

export const TimerPage = () => {
    useDocTitle();
    const { tasksList } = useOutletContext<TasksContext>();
    const { appSettings } = useSettingsContext()


    const tomatoesTotal = tasksList.reduce((prev, { tomatoesCount }) => prev + tomatoesCount
        , 0)

    return (
        <div className='container TimerPage'>
            <div className="TimerPage__Descr Descr">
                <h1 className='mg-reset Descr__Title'>Ура! Теперь можно начать работать:</h1>
                <ul className='Descr__List'>
                    <li className='Descr__Item'>
                        Выберите категорию и напишите название текущей задачи
                    </li>
                    <li className='Descr__Item'>
                        Запустите таймер («помидор»)
                    </li>
                    <li className='Descr__Item'>
                        Работайте пока «помидор» не прозвонит
                    </li>
                    <li className='Descr__Item'>
                        Сделайте короткий перерыв (3-5 минут)
                    </li>
                    <li className='Descr__Item'>
                        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                    </li>
                </ul>
            </div>
            <div className="TimerPage__Timer">
                {(tasksList.length > 0) ? <Timer /> : <TomatoMainSvg className='SpeakingTomato' />}
            </div>
            <TaskForm additCssClass='TimerPage__Form' />
            <div className="TimerPage__Tasks">
                <TasksList additCssClass='TimerPage__List' />
                <div className="TimerPage__TotalSum">
                    {(tasksList.length > 0) && getTasksTimeString(tomatoesTotal * appSettings.tomatoDuration)}
                </div>
            </div>
        </div>

    )
}
