import { FC, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';
import './taskitem.scss';
import { Task, TasksContext } from '@/types';
import { transformFirstLetter } from '@/utils/transformFirstLetter';
import { FieldType, useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { useOutletContext } from 'react-router-dom';

interface TaskItemProps {
    taskItem: Task,
    isActive?: boolean,
}
export const TaskItem: FC<TaskItemProps> = ({ taskItem, isActive = false }) => {
    const { dispatchTask } = useOutletContext<TasksContext>();

    const [enableEdit, setEnableEdit] = useState(false);

    //task input logic
    const { register, errors, formState } = useFormValidation({ editedTask: transformFirstLetter(taskItem.task) }, 'blur change');

    const { value, name, onChange, onBlur } = register('editedTask', { required: { value: true } })

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        enableEdit && inputRef.current?.focus()
    }, [enableEdit])

    const handleEdit: MouseEventHandler<HTMLButtonElement> = () => {
        setEnableEdit(true)
    }

    const rewriteTask = (value: string) => {
        if (formState === 'valid') {
            dispatchTask({
                type: 'changeTask',
                id: taskItem.id,
                toChange: { task: value }
            })
            setEnableEdit(false)
        }
    }

    const handleBlur: FocusEventHandler<FieldType> = (e) => {
        onBlur(e)
        rewriteTask(e.currentTarget.value)
    }

    const handleEnter: KeyboardEventHandler<FieldType> = (e) => {
        if (e.key !== 'Enter') return;
        rewriteTask(e.currentTarget.value)
    }

    return (
        <div className={`TaskItem ${isActive && 'TaskItem--active'}`}>
            <span className='TaskItem__TomatoesCount'>
                {taskItem.tomatoes.length}
            </span>
            <input
                ref={inputRef}
                type="text"
                className='TaskItem__Name'
                {...(!enableEdit && { disabled: true } || {})}
                onChange={onChange}
                onBlur={handleBlur}
                value={value}
                name={name}
                onKeyUp={handleEnter}

            />
            {errors.editedTask &&
                <span className='TaskItem__ErrorMessage'>
                    {errors.editedTask}
                </span>
            }
            <button onClick={handleEdit}>edit</button>
        </div>
    )
}