import { FC } from 'react';
import './totaltime.scss';

interface TotalTimeProps {
    totalTime: string
}
export const TotalTime: FC<TotalTimeProps> = ({ totalTime }) => {
    return (
        <div className="TotalTime">
            <h2 className="TotalTime__Title mg-reset">Понедельник</h2>
            <p className="TotalTime__Descr mg-reset">
                Вы работали над задачами в течение <span>{totalTime}</span>
            </p>
        </div>
    )
}