import { FC } from 'react';
import './taskslist.scss';

interface TasksListProps {
    additCssClass?: string
}


export const TasksList: FC<TasksListProps> = ({ additCssClass = '' }) => {
    return (
        <ul className={`${additCssClass} TasksList`}>

        </ul>
    )
}