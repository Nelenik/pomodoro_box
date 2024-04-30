import { TasksContext } from '@/types';
import { useOutletContext } from 'react-router-dom';
import { Button } from '../buttons/Button';
import './modal.scss';
import CloseBtn from 'assets/close-btn.svg?react'

export const Modal = () => {
    const { dispatchTask } = useOutletContext<TasksContext>();

    return (
        <div className='Modal'>
            <div className="Modal__Content Content">
                <button className='Modal__CloseBtn btn-reset'>
                    <CloseBtn />
                </button>
                <p className='Content__Text'>Удалить задачу?</p>
                <Button view='redFull' type='button'>Удалить</Button>
                <button className='btn-reset Content__Chancel'>Отмена</button>
            </div>
        </div>
    )
}