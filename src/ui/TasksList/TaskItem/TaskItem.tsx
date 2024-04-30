import { Dispatch, FC, FocusEventHandler, KeyboardEventHandler, SetStateAction } from 'react';
import { Task } from '@/types';
import { transformFirstLetter, NOOP } from '@/utils';
import { FieldType, useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { Dropdown } from '@/ui/Dropdown';
import { useTaskItem } from './useTaskItem';
import './taskitem.scss';

interface TaskItemProps {
    taskItem: Task,
    isActiveTask?: boolean,
    manageDropdowns?: [number, Dispatch<SetStateAction<number>>],
    itemIndex?: number
}
export const TaskItem: FC<TaskItemProps> = ({ taskItem, isActiveTask = false, manageDropdowns = [0, NOOP], itemIndex = 0 }) => {
    //task input validation
    const { register, errors, formState } = useFormValidation({ editedTask: transformFirstLetter(taskItem.task) }, 'blur change');

    const { value, name, onChange, onBlur } = register('editedTask', { required: { value: true } })

    //useTaskItem hook
    const { editTask, inputRef, rewriteTask, dropdownItems } = useTaskItem(taskItem, formState)
    //manageDropdowns
    const [activeDropdown, setActiveDropdown] = manageDropdowns

    const handleBlur: FocusEventHandler<FieldType> = (e) => {
        onBlur(e)
        rewriteTask(e.currentTarget.value)
    }
    const handleEnter: KeyboardEventHandler<FieldType> = (e) => {
        if (e.key !== 'Enter') return;
        rewriteTask(e.currentTarget.value)
    }

    return (
        <div className={`TaskItem ${isActiveTask && 'TaskItem--active'}`}>
            <span className='TaskItem__TomatoesCount'>
                {taskItem.tomatoes.length}
            </span>
            <input
                ref={inputRef}
                type="text"
                className='TaskItem__Name'
                {...(!editTask && { disabled: true } || {})}
                onChange={onChange}
                onBlur={handleBlur}
                value={value}
                name={name}
                onKeyDown={handleEnter}

            />
            {errors.editedTask &&
                <span className='TaskItem__ErrorMessage'>
                    {errors.editedTask}
                </span>
            }
            <Dropdown
                list={dropdownItems}
                index={itemIndex?.toString()}
                isActiveDropdown={activeDropdown === itemIndex}
                dropdownOnClick={() => { setActiveDropdown(itemIndex) }}
                triggerInner={
                    <span></span>
                }
                additCss={{
                    dropdownCss: 'TaskMenu',
                    triggerCss: 'TaskMenu__Trigger',
                    menuCss: 'TaskMenu__List',
                    itemCss: 'TaskMenu__Item'
                }}
            />
        </div>
    )
}