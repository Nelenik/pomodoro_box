import './taskform.scss';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { Button } from '../buttons/Button';
import { PlaceholderField } from '../PlaceholderField';
import { useFormValidation } from '@/hooks/useFormValidation/useFormValidation';

export const TaskForm = () => {
    const [taskValue, setTaskValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    //validation
    const { register, onSubmit, errors } = useFormValidation({ task: '' }, 'change');
    const { value, name, onChange, onBlur } = register("task", { required: { value: true } })


    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTaskValue(e.target.value);
        onChange(e)
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocused(true)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        setIsFocused(false);
        onBlur(e)
    }
    return (
        <form
            className='TaskForm'
            autoComplete='off'
            onSubmit={onSubmit(() => console.log('submitted'))}
        >
            <PlaceholderField
                label='Название задачи'
                toMovePlaceholder={isFocused || taskValue.length > 0}
                errorMessage={errors.task}
            >
                <input
                    className='TaskForm-Field'
                    type="text"
                    value={value}
                    name={name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </PlaceholderField>
            <Button>
                Добавить
            </Button>
        </form>
    )
}