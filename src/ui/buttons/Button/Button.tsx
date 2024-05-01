import './button.scss';
import { FC, MouseEventHandler, ReactElement } from 'react';
import { NOOP } from '@/utils';

interface IButtonProps {
    children: ReactElement | string,
    handler?: MouseEventHandler<HTMLButtonElement>,
    view?: 'green' | 'red' | 'inactive' | 'redFull',
    type?: 'submit' | 'button',
    additCssClass?: string
}

export const Button: FC<IButtonProps> = ({ children, handler = NOOP, view = "green", type = 'submit', additCssClass = '' }) => {
    const viewParams = {
        green: 'mainBtn--green',
        red: "mainBtn--red",
        inactive: "mainBtn--inactive",
        redFull: 'mainBtn--redFull'
    }
    return (
        <button onClick={handler} className={`btn-reset mainBtn ${viewParams[view]} ${additCssClass}`} type={type}>
            {children}
        </button>
    )
}