import { Outlet, NavLink, Link } from 'react-router-dom';
import './layout.scss';
import LogoSvg from 'assets/tomato-logo.svg?react';
import StatSvg from 'assets/statistics.svg?react';
import TimerSvg from 'assets/timer.svg?react'
import { useTasksList } from '@/hooks/useTasksList';
import { createContext, useState } from 'react';
import { Settings } from '@/types/settings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SettingsContext = createContext<any>(null)

export const Layout = () => {
    const tasksState = useTasksList()
    const [appSettings, setAppSettings] = useState<Settings>({
        theme: 'default',
        tomatoDuration: 25,
        longBreakDuration: 15,
        shortBreakDuration: 5
    })

    return (
        <>
            <SettingsContext.Provider value={appSettings}>
                <header className='header'>
                    <div className="container header__container">
                        <Link to={'/'} className='header__logo'><LogoSvg /></Link>
                        <nav className='nav'>
                            <NavLink className='nav__link' to={'/'}>
                                <TimerSvg />Таймер
                            </NavLink>
                            <NavLink className='nav__link' to={'statistics'}>
                                <StatSvg />Статистика
                            </NavLink>
                        </nav>
                    </div>
                </header>
                <main className='main'>
                    <Outlet context={tasksState} />
                </main>
            </SettingsContext.Provider>

        </>

    )
}