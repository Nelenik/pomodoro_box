import { Outlet, NavLink, Link } from 'react-router-dom';
import './layout.scss';
import LogoSvg from 'assets/tomato-logo.svg?react';
import HomeSvg from 'assets/home.svg?react';
import StatSvg from 'assets/statistics.svg?react';
import TimerSvg from 'assets/timer.svg?react'

export const Layout = () => {
    return (
        <>
            <header className='header'>
                <div className="container header__container">
                    <Link to={'/'} className='header__logo'><LogoSvg /></Link>
                    <nav className='nav'>
                        <NavLink className='nav__link' to={'/'}>
                            <HomeSvg />Главная
                        </NavLink>
                        <NavLink className='nav__link' to={'timer'}>
                            <TimerSvg />Таймер
                        </NavLink>
                        <NavLink className='nav__link' to={'statistics'}>
                            <StatSvg />Статистика
                        </NavLink>
                    </nav>
                </div>
            </header>
            <main className='main'>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </>

    )
}