import './timerPage.scss';
// import { FC } from 'react';
import useDocTitle from '@/hooks/useDocTitle';
import { TaskForm } from '@/ui/TaskForm';
import { TasksList } from '@/ui/TasksList';
import { Timer } from '@/ui/Timer';

import TomatoMainSvg from 'assets/tomato-main.svg?react'
import { useOutletContext } from 'react-router-dom';
import { TasksContext } from '@/types';

import { Dropdown } from '@/ui/Dropdown';
import generateId from '@/utils/generateId';
import { useState } from 'react';

const list = [
    {
        id: generateId(),
        inner: 'first item',
        itemOnClick: () => console.log('item clicked')
    },
    {
        id: generateId(),
        inner: 'second item'
    }
]

export const TimerPage = () => {
    useDocTitle();
    const { tasksList } = useOutletContext<TasksContext>();
    const [activeIndex, setActiveIndex] = useState(-1)
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
            <TasksList additCssClass='TimerPage__List' />

            <Dropdown
                isActiveDropdown={activeIndex === 0}
                dropdownOnClick={() => { setActiveIndex(0) }}
                buttonInner={<span>Span</span>}
                list={list}
            />
            <Dropdown
                isActiveDropdown={activeIndex === 1}
                dropdownOnClick={() => { setActiveIndex(1) }}
                buttonInner={<span>Span</span>}
                list={list}
            />
        </div>

    )
}
