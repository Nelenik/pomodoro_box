import { Dispatch, FC, FocusEventHandler, KeyboardEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import './taskitem.scss';
import { Task, TasksContext } from '@/types';
import { transformFirstLetter, NOOP, generateId } from '@/utils';
import { FieldType, useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { useOutletContext } from 'react-router-dom';
import { Dropdown } from '@/ui/Dropdown';
//menu svg
import DropDeleteSvg from 'assets/drop-delete.svg?react';
import DropEditSvg from 'assets/drop-edit.svg?react';
import DropLessSvg from 'assets/drop-less.svg?react';
import DropMoreSvg from 'assets/drop-more.svg?react';

interface TaskItemProps {
    taskItem: Task,
    isActive?: boolean,
    manageDropdowns?: [number, Dispatch<SetStateAction<number>>],
    itemIndex?: number
}
export const TaskItem: FC<TaskItemProps> = ({ taskItem, isActive = false, manageDropdowns = [0, NOOP], itemIndex = 0 }) => {
    const { dispatchTask } = useOutletContext<TasksContext>();

    const [enableEdit, setEnableEdit] = useState(false);

    const [activeDropdown, setActiveDropdown] = manageDropdowns

    //task input logic
    const { register, errors, formState } = useFormValidation({ editedTask: transformFirstLetter(taskItem.task) }, 'blur change');

    const { value, name, onChange, onBlur } = register('editedTask', { required: { value: true } })

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        enableEdit && inputRef.current?.focus()
    }, [enableEdit])

    const handleEdit = () => {
        setEnableEdit(true)
    }

    const rewriteTask = (value: string) => {
        if (formState === 'valid') {
            dispatchTask({
                type: 'CHANGE_TASK',
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
            <Dropdown
                list={[
                    {
                        id: generateId(),
                        inner: <><DropMoreSvg /> <span>Увеличить</span></>,
                        itemOnClick: () => { }
                    },
                    {
                        id: generateId(),
                        inner: <><DropLessSvg /> <span>Уменьшить</span></>,
                        itemOnClick: () => { }
                    },
                    {
                        id: generateId(),
                        inner: <><DropEditSvg /> <span>Редактировать</span></>,
                        itemOnClick: handleEdit
                    },
                    {
                        id: generateId(),
                        inner: <><DropDeleteSvg /> <span>Удалить</span></>,
                        itemOnClick: () => { }
                    },
                ]}
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