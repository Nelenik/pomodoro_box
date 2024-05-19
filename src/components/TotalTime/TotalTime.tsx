import { FC } from 'react';
import './totaltime.scss';

interface TotalTimeProps {
    totalTime: string | null,
    dayName: string
}
export const TotalTime: FC<TotalTimeProps> = ({ totalTime, dayName }) => {
    return (
        <div className="TotalTime">
            <h2 className="TotalTime__Title mg-reset">{dayName}</h2>
            {
                totalTime && <p className="TotalTime__Descr mg-reset">
                    Вы работали над задачами в течение <span>{totalTime}</span>
                </p>
                || <p className="TotalTime__Descr mg-reset">Нет данных</p>
            }
        </div>
    )
}