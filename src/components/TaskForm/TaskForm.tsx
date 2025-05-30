import './taskForm.scss';
import { FC } from 'react';
import { Button } from '../buttons/Button';
import { PlaceholderField } from '../PlaceholderField';
import { useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { Task } from '@/types';
import { generateId } from '@/utils';
import { useDispatchTasks } from '@/reducers_providers/TasksListProvider';

interface TaskFormProps {
    additCssClass?: string
}

export const TaskForm: FC<TaskFormProps> = ({ additCssClass = '' }) => {
    const { register, onSubmit, errors, reset, formData } = useFormValidation({ task: '' }, 'change');
    const dispatchTasks = useDispatchTasks()

    const handleSubmit = onSubmit(() => {
        const toSubmit: Task = {
            ...formData,
            id: generateId(),
            tomatoesCount: 1,
            timeOnTask: 0
        }
        dispatchTasks({
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
                label='Task title'
                errors={errors}
                inputProps={{
                    type: 'text',
                    register,
                    fieldName: 'task',
                    rules: { required: { value: true } }
                }}
            />
            <Button>
                Add task
            </Button>
        </form>
    )
}