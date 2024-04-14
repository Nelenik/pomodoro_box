import { ReactElement, FC } from 'react';
import './placeholderfield.scss';

interface IPlaceholderFieldProps {
    children: ReactElement,
    label: string,
    toMovePlaceholder?: boolean,
    errorMessage?: string,
}

export const PlaceholderField: FC<IPlaceholderFieldProps> = ({ children, label, toMovePlaceholder = false, errorMessage }) => {

    return (
        <label className="Field">
            {children}
            <span
                className={`Field-Placeholder ${(toMovePlaceholder && `Field-Placeholder--moved`) || ''}`}>
                {label}
            </span>
            {errorMessage && <span className='Field-Error'>{errorMessage}</span>}

        </label>
    )
}