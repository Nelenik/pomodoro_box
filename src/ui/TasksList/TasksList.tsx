import { Dispatch, FC, SetStateAction, useState } from 'react';
import './taskslist.scss';
import { useOutletContext } from 'react-router-dom';
import { TasksContext } from '@/types';
import { TaskItem } from './TaskItem';

interface TasksListProps {
    additCssClass?: string
}


export const TasksList: FC<TasksListProps> = ({ additCssClass = '' }) => {
    const { tasksList } = useOutletContext<TasksContext>();
    const manageDropdowns: [number, Dispatch<SetStateAction<number>>] = useState(-1)
    return (
        <ul className={`mg-reset ${additCssClass} TasksList`}>
            {tasksList.map((item, itemIndex) => (
                <li key={item.id}>
                    <TaskItem
                        taskItem={item}
                        manageDropdowns={manageDropdowns}
                        itemIndex={itemIndex}
                    />
                </li>
            ))}
        </ul>
    )
}