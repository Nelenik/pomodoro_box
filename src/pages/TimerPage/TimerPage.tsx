import './timerPage.scss';
import useDocTitle from '@/hooks/useDocTitle';
import { TaskForm } from '@/ui/TaskForm';
// import { Button } from '@/ui/buttons/Button';
// import { RoundBtn } from '@/ui/buttons/RoundBtn';


export const Timer = () => {
    useDocTitle()
    return (
        <div className='container timerPage'>
            <div className="descr">
                <h1 className='mg-reset descr__title'>Ура! Теперь можно начать работать:</h1>
                <ul className='descr__list'>
                    <li className='descr__item'>
                        Выберите категорию и напишите название текущей задачи
                    </li>
                    <li className='descr__item'>
                        Запустите таймер («помидор»)
                    </li>
                    <li className='descr__item'>
                        Работайте пока «помидор» не прозвонит
                    </li>
                    <li className='descr__item'>
                        Сделайте короткий перерыв (3-5 минут)
                    </li>
                    <li className='descr__item'>
                        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                    </li>
                </ul>
            </div>
            <TaskForm />
        </div>

    )
}
