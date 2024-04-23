import { FC } from 'react';
import './taskitem.scss';
import { Task } from '@/types';

interface TaskItemProps {
    item: Task,
    isActive?: boolean
}
export const TaskItem: FC<TaskItemProps> = ({ item, isActive = false }) => {
    return (
        <div className={`TaskItem ${isActive && 'TaskItem--active'}`}>
            <span className='TaskItem__TomatoesCount'>
                {item.tomatoes.length}
            </span>
            <span className='TaskItem__Name'>
                {item.task}
            </span>
        </div>
    )
}