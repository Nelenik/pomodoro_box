// import { Button } from '../buttons/Button';
import './modal.scss';
import CloseBtnSvg from 'assets/close-btn.svg?react'
import { FC, ReactNode, RefObject, createContext, useCallback, useEffect, useRef } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean,
    blockClassName?: string,
    animTime?: number
}

export const ModalContext = createContext<RefObject<HTMLDivElement> | null>(null)

export const Modal: FC<ModalProps> = ({ children, isOpen = false, onClose, blockClassName = "Modal", animTime = 500 }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

    const classes = {
        main: blockClassName,
        closed: `${blockClassName}--closed`,
        open: `${blockClassName}--open`,
        content: `${blockClassName}__Content`,
        closeBtn: `${blockClassName}__CloseBtn`
    }

    //add open class for animation
    useEffect(() => {
        let timeout: number;
        if (isOpen) {
            timeout = setTimeout(() => {
                modalRef.current?.classList.add(classes.open);
            }, animTime)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [isOpen, animTime, classes.open])

    //focus trap  with inert attribute
    useEffect(() => {
        isOpen && modalCloseBtnRef.current?.focus();
        const rootEl = document.getElementById('root')
        if (isOpen && rootEl) {
            rootEl.setAttribute('inert', '')
            document.body.classList.add('body-lock')
        }
        return () => {
            if (rootEl) {
                rootEl.removeAttribute('inert');
                document.body.classList.remove('body-lock')

            }
        }
    }, [isOpen])

    const handleModalClose = useCallback(() => {
        modalRef.current?.classList.remove(classes.open);
        setTimeout(onClose, animTime)
    }, [onClose, animTime, classes.open])

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
                className={`${classes.main} ${classes.closed}`}
                onClick={(e) => {
                    if ((e.target as HTMLElement)?.closest(`.${classes.content}`)) return
                    handleModalClose()
                }}
                ref={modalRef}
                role='dialog'
                aria-modal="true"
            >
                <div className={classes.content}>
                    <button
                        className={`${classes.closeBtn} btn-reset`}
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