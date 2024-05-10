import { FC } from 'react';
import { useModalContext } from '../Modal/useModalContext';
import { Button } from '../buttons/Button';
import './confirmdelete.scss';

interface ConfirmDeleteProps {
    onConfirmDelete: () => void
}

export const ConfirmDelete: FC<ConfirmDeleteProps> = ({ onConfirmDelete }) => {
    const modalRef = useModalContext()
    return (
        <div className="ConfirmDelete">
            <p className='ConfirmDelete__Text'>Удалить задачу?</p>
            <Button
                view='redFull'
                type='button' additCssClass='ConfirmDelete__Delete'
                handler={() => {
                    modalRef.current?.classList.remove('Modal--open');
                    setTimeout(onConfirmDelete, 500)
                }}
            >
                Удалить
            </Button>
            <button className='btn-reset ConfirmDelete__Chancel' onClick={() => modalRef.current?.click()}>Отмена</button>
        </div>
    )
}