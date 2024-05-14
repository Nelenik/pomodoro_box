import { NOOP } from '@/utils';
import './roundbtn.scss';
import { FC, MouseEventHandler } from 'react';

interface IRoundBtnProps {
    handler?: MouseEventHandler<HTMLButtonElement>,
    view?: 'green' | 'inactive',
    isActive?: boolean
}
export const RoundBtn: FC<IRoundBtnProps> = ({ handler = NOOP, view = 'green' }) => {
    const viewParams = {
        green: "roundBtn--green",
        inactive: 'roundBtn--inactive'
    }
    return (
        <button
            onClick={handler}
            className={`btn-reset roundBtn ${viewParams[view]}`} aria-label='Кнопка увеличить время помидорки'></button>
    )
}