// import { Button } from '../buttons/Button';
import './modal.scss';
import CloseBtnSvg from 'assets/close-btn.svg?react'
import { FC, ReactNode, RefObject, createContext, useCallback, useEffect, useRef } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean,
}

export const ModalContext = createContext<RefObject<HTMLDivElement> | null>(null)

export const Modal: FC<ModalProps> = ({ children, isOpen = false, onClose }) => {
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
        isOpen && <ModalContext.Provider value={modalRef}>
            <div
                className={`Modal`}
                onClick={(e) => {
                    if ((e.target as HTMLElement)?.closest('.Modal__Content')) return
                    handleModalClose()
                }}
                ref={modalRef}
                role='dialog'
                aria-modal="true"
            >
                <div className="Modal__Content">
                    <button
                        className='Modal__CloseBtn btn-reset'
                        onClick={handleModalClose}
                        ref={modalCloseBtnRef}
                    >
                        <CloseBtnSvg />
                    </button>
                    {children}
                </div>
            </div>
        </ModalContext.Provider> || null
    )
}