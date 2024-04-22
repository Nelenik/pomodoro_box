import './taskForm.scss';
import { FC } from 'react';
import { Button } from '../buttons/Button';
import { PlaceholderField } from '../PlaceholderField';
import { useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { Task } from '@/types';

interface TaskFormProps {
    additCssClass?: string
}

export const TaskForm: FC<TaskFormProps> = ({ additCssClass = '' }) => {
    const { register, onSubmit, errors, reset, formData } = useFormValidation<Task>({ task: '', done: false, tomatoes: [] }, 'change');

    const handleSubmit = onSubmit(() => {
        console.log('submitted');
        console.log(formData);
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