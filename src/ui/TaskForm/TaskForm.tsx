import './taskForm.scss';
import { FC } from 'react';
import { Button } from '../buttons/Button';
import { PlaceholderField } from '../PlaceholderField';
import { useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { Task, TasksContext } from '@/types';
import { generateId } from '@/utils';
import { useOutletContext } from 'react-router-dom';

interface TaskFormProps {
    additCssClass?: string
}

export const TaskForm: FC<TaskFormProps> = ({ additCssClass = '' }) => {
    const { register, onSubmit, errors, reset, formData } = useFormValidation({ task: '' }, 'change');
    const { dispatchTask } = useOutletContext<TasksContext>()

    const handleSubmit = onSubmit(() => {
        const toSubmit: Task = {
            ...formData,
            id: generateId(),
            done: false,
            tomatoes: [
                {
                    id: generateId(),
                    time: 25
                }
            ]
        }
        dispatchTask({
            type: 'ADD_TASK',
            task: toSubmit
        })
        reset()
    })
    return (
        <form
            className={`${additCssClass} TaskForm`}
            autoComplete='off'
            onSubmit={handleSubmit}
        >
            <PlaceholderField
                label='Название задачи'
                errors={errors}
                inputProps={{
                    type: 'text',
                    register,
                    fieldName: 'task',
                    rules: { required: { value: true } }
                }}
            />
            <Button>
                Добавить
            </Button>
        </form>
    )
}