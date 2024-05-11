import { Dispatch, FC, SetStateAction, useState } from 'react';
import './taskslist.scss';
import { TasksListType } from '@/types';
import { TaskItem } from './TaskItem';
// import { useActiveTaskContext } from '@/reducers_providers/ActiveTaskProvider';

interface TasksListProps {
    additCssClass?: string
    tasksList: TasksListType
}


export const TasksList: FC<TasksListProps> = ({ additCssClass = '', tasksList }) => {

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