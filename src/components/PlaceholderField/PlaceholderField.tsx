import { ChangeEventHandler, FC, FocusEventHandler, useState } from 'react';
import './placeholderField.scss';
import { Register, PartialRecursive, Rules, Errors, FieldType } from '@/hooks/useFormValidation/useFormValidation';
import { NOOP } from '@/utils';

interface PlaceholderFieldProps {
    label: string,
    inputProps: {
        type: string,
        register: Register,
        fieldName: string,
        rules?: PartialRecursive<Rules>
    },
    errors: Errors,
    onChangeProp?: (e: React.ChangeEvent<FieldType>) => void,
    onBlurProp?: (e: React.FocusEvent<FieldType>) => void,
    onFocusProp?: (e: React.FocusEvent<FieldType>) => void
}

export const PlaceholderField: FC<PlaceholderFieldProps> = ({ label, errors, inputProps, onChangeProp = NOOP, onBlurProp = NOOP, onFocusProp = NOOP }) => {
    const [isFocused, setIsFocused] = useState(false);

    const { type, register, fieldName, rules = {} } = inputProps;

    const { value, name, onChange, onBlur } = register(fieldName, rules)

    const toMovePlaceholder = isFocused || value.toString().length > 0
    const errorMessage = errors[fieldName]

    const handleChange: ChangeEventHandler<FieldType> = (e) => {
        onChange(e)
        onChangeProp(e)
    }

    const handleFocus: FocusEventHandler<FieldType> = (e) => {
        setIsFocused(true)
        onFocusProp(e)
    }

    const handleBlur: FocusEventHandler<FieldType> = (e) => {
        setIsFocused(false);
        onBlur(e)
        onBlurProp(e)
    }

    return (
        <label className="Field">
            <input
                type={type}
                name={name}
                value={value}
                className='TaskForm__Field'
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
            <span
                className={`Field__Placeholder ${(toMovePlaceholder && `Field__Placeholder--moved`) || ''}`}>
                {label}
            </span>
            {errorMessage && <span className='Field__Error'>{errorMessage}</span>}

        </label>
    )
}