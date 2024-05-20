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
