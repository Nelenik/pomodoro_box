import { useSettings } from '@/reducers_providers/SettingsProvider';
import './settingsform.scss';
import { FieldType, useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { ChangeEvent } from 'react';
import { PlaceholderField } from '../PlaceholderField';

export const SettingsForm = () => {
    const { appSettings, setAppSettings } = useSettings()

    const { theme, tomatoDuration, longBreak, shortBreak } = appSettings

    const { register, errors, formState } = useFormValidation(
        {
            theme: theme,
            tomatoDuration: tomatoDuration / 60,
            longBreak: longBreak / 60,
            shortBreak: shortBreak / 60
        }, "blur change");


    //theme radio buttons registration
    const { name: radioName, onChange: onRadioChange } = register('theme', {})

    const handleRadioChange = (e: ChangeEvent<FieldType>) => {
        onRadioChange(e)
        setTimeout(() => {
            setAppSettings((prev) => ({ ...prev, theme: e.target.value }))
        }, 400)
    }

    const handleInputBlur = (e: ChangeEvent<FieldType>) => {
        const { name, value } = e.target
        const valueToSec = parseInt(value) * 60
        if (formState === 'valid') {
            setAppSettings((prev) => ({ ...prev, [name]: valueToSec }))
        }
    }

    return (
        <form className='SettingsForm' autoComplete='off'>
            <div className="SettingsForm__Theme Theme">
                <h3 className="SettingsForm__Name mg-reset">
                    Тема
                </h3>
                <label className='Theme__FieldWrap'>
                    <input
                        className='Theme__Field'
                        type="radio"
                        checked={theme === 'default'}
                        value="default"
                        name={radioName}
                        onChange={handleRadioChange}
                    />
                    <span>Светлая</span>
                </label>
                <label className='Theme__FieldWrap'>
                    <input
                        className='Theme__Field'
                        type="radio"
                        checked={theme === 'inverted'}
                        value="inverted"
                        name={radioName}
                        onChange={handleRadioChange}
                    />
                    <span>Темная</span>
                </label>
            </div>
            <PlaceholderField
                label='Время одного помидора'
                errors={errors}
                onBlurProp={handleInputBlur}
                inputProps={{
                    type: 'text',
                    register,
                    fieldName: 'tomatoDuration',
                    rules: {
                        required: { value: true, message: 'Обязательное поле' },
                        pattern: { value: /^\d+$/g, message: "Введите цифры" },
                        min: { value: 1, message: `Введите значение больше 1`, },
                    }
                }} />
            <PlaceholderField
                label='Время короткого перерыва'
                errors={errors}
                onBlurProp={handleInputBlur}
                inputProps={{
                    type: 'text',
                    register,
                    fieldName: 'shortBreak',
                    rules: {
                        required: { value: true, message: 'Обязательное поле' },
                        pattern: { value: /^\d+$/g, message: "Введите цифры" },
                        min: { value: 1, message: `Введите значение больше 1`, },
                    }
                }} />
            <PlaceholderField
                label='Время длинного перерыва'
                errors={errors}
                onBlurProp={handleInputBlur}
                inputProps={{
                    type: 'text',
                    register,
                    fieldName: 'longBreak',
                    rules: {
                        required: { value: true, message: 'Обязательное поле' },
                        pattern: { value: /^\d+$/g, message: "Введите цифры" },
                        min: { value: 1, message: `Введите значение больше 1`, },
                    }
                }} />
        </form>
    )
}