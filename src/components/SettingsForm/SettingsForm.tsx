import { useSettings } from '@/reducers_providers/SettingsProvider';
import './settingsform.scss';

export const SettingsForm = () => {
    const { setAppSettings } = useSettings()
    return (
        <div>Settings</div>
    )
}