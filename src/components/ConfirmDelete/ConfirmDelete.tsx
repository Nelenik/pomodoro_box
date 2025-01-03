import { FC } from 'react';
import { useModalContext } from '../Modal/useModalContext';
import { Button } from '../buttons/Button';
import './confirmdelete.scss';

interface ConfirmDeleteProps {
    onConfirmDelete: () => void;
    onClose?: () => void;
}
//modal inner
export const ConfirmDelete: FC<ConfirmDeleteProps> = ({ onConfirmDelete, onClose = () => { } }) => {
    const modalRef = useModalContext()
    return (
        <div className="ConfirmDelete">
            <p className='ConfirmDelete__Text'>Delete task?</p>
            <Button
                view='redFull'
                type='button' additCssClass='ConfirmDelete__Delete'
                handler={() => {
                    modalRef.current?.classList.remove('Modal--open');
                    setTimeout(onConfirmDelete, 500)
                }}
            >
                Delete
            </Button>
            <button className='btn-reset ConfirmDelete__Chancel' onClick={() => {
                modalRef.current?.classList.remove('Modal--open');
                setTimeout(onClose, 500)
            }}>Cancel</button>
        </div>
    )
}