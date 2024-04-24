import { FC } from 'react';
import './taskslist.scss';
import { useOutletContext } from 'react-router-dom';
import { TasksContext } from '@/types';
import { TaskItem } from './TaskItem';

interface TasksListProps {
    additCssClass?: string
}


export const TasksList: FC<TasksListProps> = ({ additCssClass = '' }) => {
    const { tasksList } = useOutletContext<TasksContext>();
    return (
        <ul className={`mg-reset ${additCssClass} TasksList`}>
            {tasksList.map(item => (
                <li key={item.id}>
                    <TaskItem taskItem={item} />
                </li>
            ))}
        </ul>
    )
}