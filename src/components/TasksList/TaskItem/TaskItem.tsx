import { Dispatch, FC, FocusEventHandler, KeyboardEventHandler, SetStateAction } from 'react';
import { Task } from '@/types';
import { transformFirstLetter, NOOP } from '@/utils';
import { FieldType, useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { Dropdown } from '@/components/Dropdown';
import { useTaskItem } from './useTaskItem';
import { useActiveTaskContext } from '@/reducers_providers/ActiveTaskProvider';
import './taskitem.scss';

interface TaskItemProps {
    taskItem: Task,
    isActiveTask?: boolean,
    manageDropdowns?: [number, Dispatch<SetStateAction<number>>],
    itemIndex?: number
}
export const TaskItem: FC<TaskItemProps> = ({ taskItem, manageDropdowns = [0, NOOP], itemIndex = 0 }) => {
    //ref link to active taskElement
    const activeTaskElRef = useActiveTaskContext()
    //task input validation
    const { register, errors, formState } = useFormValidation({ editedTask: transformFirstLetter(taskItem.task) }, 'blur change');

    const { value, name, onChange, onBlur } = register('editedTask', { required: { value: true } })

    //useTaskItem hook
    const { editTask, inputRef, rewriteTask, dropdownItems, insertModal } = useTaskItem(taskItem, formState)
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

    const isActiveTask = itemIndex === 0

    return (
        <div
            className={`TaskItem ${isActiveTask && 'TaskItem--active' || ''}`}
            {...isActiveTask && { ref: activeTaskElRef }}
        >
            <span className='TaskItem__TomatoesCount'>
                {taskItem.tomatoesCount}
            </span>
            <label className='TaskItem__NameLabel'>
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
            </label>
            {errors.editedTask &&
                <span className='TaskItem__ErrorMessage'>
                    {errors.editedTask}
                </span>
            }
            <Dropdown
                optionsSettings={dropdownItems}
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
            {insertModal()}
        </div>
    )
}