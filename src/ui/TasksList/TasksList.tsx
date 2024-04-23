import { FC } from 'react';
import './taskslist.scss';
import { useOutletContext } from 'react-router-dom';
import { TasksContextTuple } from '@/types';
import { TaskItem } from '../TaskItem';

interface TasksListProps {
    additCssClass?: string
}


export const TasksList: FC<TasksListProps> = ({ additCssClass = '' }) => {
    const [tasksList] = useOutletContext<TasksContextTuple>();
    console.log(tasksList)
    return (
        <ul className={`mg-reset ${additCssClass} TasksList`}>
            {tasksList.map(item => (
                <li key={item.id}>
                    <TaskItem item={item} />
                </li>
            ))}
        </ul>
    )
}