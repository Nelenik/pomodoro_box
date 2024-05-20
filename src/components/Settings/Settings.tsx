import { useState } from 'react';
import './settings.scss';
import SettingsSvg from 'assets/settings.svg?react';
import { createPortal } from 'react-dom';
import { Modal } from '../Modal';
import { SettingsForm } from '../SettingsForm';

export const Settings = () => {

    const [isOpenPanel, setIsOpenPanel] = useState(false)

    const handleTriggerClick = () => {
        setIsOpenPanel(true)
    }

    return (
        <>
            <button className='btn-reset SetsTrigger' type='button' onClick={handleTriggerClick}>
                <SettingsSvg />
            </button>
            {
                createPortal(<Modal isOpen={isOpenPanel} onClose={() => setIsOpenPanel(false)} blockClassName='SetsModal'>
                    <SettingsForm />
                </Modal>, document.body)
            }
        </>
    )
}