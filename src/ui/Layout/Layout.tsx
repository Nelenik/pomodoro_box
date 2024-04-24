import { Outlet, NavLink, Link } from 'react-router-dom';
import './layout.scss';
import LogoSvg from 'assets/tomato-logo.svg?react';
import StatSvg from 'assets/statistics.svg?react';
import TimerSvg from 'assets/timer.svg?react'
import { useTasksList } from '@/hooks/useTasksList';

export const Layout = () => {
    const tasksState = useTasksList()

    return (
        <>
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
        </>

    )
}