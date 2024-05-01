import { Button } from '../buttons/Button';
import './modal.scss';
import CloseBtnSvg from 'assets/close-btn.svg?react'
import { FC, useCallback, useEffect, useRef } from 'react';

interface ModalProps {
    onClose: () => void;
    onDelete: () => void;
    isOpen: boolean,
}

export const Modal: FC<ModalProps> = ({ isOpen = false, onClose, onDelete }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

    //add open class for animation
    useEffect(() => {
        let timeout: number;
        if (isOpen) {
            timeout = setTimeout(() => {
                modalRef.current?.classList.add('Modal--open');
            }, 500)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [isOpen])

    //focus trap  with inert attribute
    useEffect(() => {
        isOpen && modalCloseBtnRef.current?.focus();
        const rootEl = document.getElementById('root')
        isOpen && rootEl && rootEl.setAttribute('inert', '')
        return () => {
            rootEl?.removeAttribute('inert')
        }
    }, [isOpen])

    const handleModalClose = useCallback(() => {
        modalRef.current?.classList.remove('Modal--open');
        setTimeout(onClose, 500)
    }, [onClose])

    //close on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                handleModalClose()
            }
        }
        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)

    }, [isOpen, handleModalClose])

    return (
        isOpen && <div
            className={`Modal`}
            onClick={handleModalClose}
            ref={modalRef}
            role='dialog'
            aria-modal="true"
        >
            <div className="Modal__Content Content">
                <button
                    className='Modal__CloseBtn btn-reset'
                    onClick={handleModalClose}
                    ref={modalCloseBtnRef}
                >
                    <CloseBtnSvg />
                </button>
                <p className='Content__Text'>Удалить задачу?</p>
                <Button
                    view='redFull'
                    type='button' additCssClass='Content__Delete'
                    handler={() => {
                        modalRef.current?.classList.remove('Modal--open');
                        setTimeout(onDelete, 500)
                    }}
                >
                    Удалить
                </Button>
                <button className='btn-reset Content__Chancel' onClick={handleModalClose}>Отмена</button>
            </div>
        </div> || null
    )
}