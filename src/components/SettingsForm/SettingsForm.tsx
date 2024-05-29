import { useSettings } from '@/reducers_providers/SettingsProvider';
import './settingsform.scss';
import { FieldType, useFormValidation } from '@/hooks/useFormValidation/useFormValidation';
import { ChangeEvent } from 'react';
import { PlaceholderField } from '../PlaceholderField';

export const SettingsForm = () => {
    const { appSettings, setAppSettings } = useSettings()

    const { theme, tomatoDuration, longBreak, shortBreak, audioSignal, workingPeriodsCount } = appSettings

    const { register, errors, formState } = useFormValidation(
        {
            theme: theme,
            tomatoDuration: tomatoDuration / 60,
            longBreak: longBreak / 60,
            shortBreak: shortBreak / 60,
            audioSignal: '',
            workingPeriodsCount: workingPeriodsCount
        }, "blur change");


    //theme radio buttons registration
    const { name: radioName, onChange: onRadioChange } = register('theme', {})

    const handleRadioChange = (e: ChangeEvent<FieldType>) => {
        onRadioChange(e)
        setTimeout(() => {
            setAppSettings((prev) => ({ ...prev, theme: e.target.value }))
        }, 400)
    }
    //notifications checkbox registration
    const { name: audioName, onChange: onAudioChange } = register('audioSignal', {})
    const handleAudioChange = (e: ChangeEvent<FieldType>) => {
        if (e.target instanceof HTMLInputElement) {
            const { checked } = e.target
            onAudioChange(e);
            setTimeout(() => {
                setAppSettings((prev) => ({ ...prev, audioSignal: checked }))
            })
        }
    }
    // inputs with work and break duration
    const handleInputBlur = (e: ChangeEvent<FieldType>) => {
        const { name, value } = e.target
        const newValue = name === 'workingPeriodsCount' ? parseInt(value) : parseInt(value) * 60
        // const valueToSec = parseInt(value) * 60
        if (formState === 'valid') {
            setAppSettings((prev) => ({ ...prev, [name]: newValue }))
        }
    }

    return (
        <form className='SettingsForm' autoComplete='off'>
            <div className="SettingsForm__Theme Switcher">
                <h3 className="SettingsForm__Name mg-reset">
                    Тема
                </h3>
                <label className='Switcher__FieldWrap'>
                    <input
                        className='Switcher__Field'
                        type="radio"
                        checked={theme === 'default'}
                        value="default"
                        name={radioName}
                        onChange={handleRadioChange}
                    />
                    <span>Светлая</span>
                </label>
                <label className='Switcher__FieldWrap'>
                    <input
                        className='Switcher__Field'
                        type="radio"
                        checked={theme === 'inverted'}
                        value="inverted"
                        name={radioName}
                        onChange={handleRadioChange}
                    />
                    <span>Темная(инверсия)</span>
                </label>
            </div>
            <div className="SettingsForm__Notifications Switcher">
                <h3 className="SettingsForm__Name mg-reset">
                    Уведомления
                </h3>
                <label className='Switcher__FieldWrap'>
                    <input
                        className='Switcher__Field'
                        type="checkbox"
                        checked={audioSignal}
                        name={audioName}
                        onChange={handleAudioChange}
                    />
                    <span>Аудио-сигнал</span>
                </label>
            </div>
            <PlaceholderField
                label='Частота длинных перерывов'
                errors={errors}
                onBlurProp={handleInputBlur}
                inputProps={{
                    type: 'text',
                    register,
                    fieldName: 'workingPeriodsCount',
                    rules: {
                        required: { value: true, message: 'Обязательное поле' },
                        pattern: { value: /^\d+$/g, message: "Введите цифры" },
                        min: { value: 2, message: `Введите значение больше 2`, },
                    }
                }} />
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