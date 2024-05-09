import { Dispatch, FC, SetStateAction, useState } from 'react';
import './taskslist.scss';
import { useOutletContext } from 'react-router-dom';
import { TasksContext } from '@/types';
import { TaskItem } from './TaskItem';
// import { useActiveTaskContext } from '@/reducers_providers/ActiveTaskProvider';

interface TasksListProps {
    additCssClass?: string
}


export const TasksList: FC<TasksListProps> = ({ additCssClass = '' }) => {
    const { tasksList } = useOutletContext<TasksContext>();
    const manageDropdowns: [number, Dispatch<SetStateAction<number>>] = useState(-1)

    return (
        <ul className={`mg-reset ${additCssClass} TasksList`}>
            {tasksList.filter(item => !item.done).map((item, itemIndex) => (
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