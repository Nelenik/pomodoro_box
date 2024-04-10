import './button.scss';
import { FC, MouseEventHandler, ReactElement } from 'react';
import NOOP from '@/utils/noop';

interface IButtonProps {
    children: ReactElement | string,
    handler?: MouseEventHandler<HTMLButtonElement>,
    view?: 'green' | 'red' | 'inactive',
    type?: 'submit' | 'button',
}

export const Button: FC<IButtonProps> = ({ children, handler = NOOP, view = "green", type = 'submit' }) => {
    const viewParams = {
        green: 'mainBtn--green',
        red: "mainBtn--red",
        inactive: "mainBtn--inactive"
    }
    return (
        <button onClick={handler} className={`btn-reset mainBtn ${viewParams[view]}`} type={type}>
            {children}
        </button>
    )
}