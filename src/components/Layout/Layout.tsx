import { Outlet, NavLink, Link } from 'react-router-dom';
import './layout.scss';
import { Settings } from '../Settings';
//nav svg-s
import LogoSvg from 'assets/tomato-logo.svg?react';
import StatSvg from 'assets/statistics.svg?react';
import TimerSvg from 'assets/timer.svg?react';

export const Layout = () => {

    return (
        <>
            <header className='Header'>
                <div className="container Header__Container">
                    <Link to={'/'} className='Header__Logo'><LogoSvg /></Link>
                    <nav className='Nav'>
                        <NavLink className='Nav__Link' to={'/'}>
                            <TimerSvg />Таймер
                        </NavLink>
                        <NavLink className='Nav__Link' to={'statistics'}>
                            <StatSvg />Статистика
                        </NavLink>
                    </nav>
                    <div className='AppSettings'>
                        <Settings />
                    </div>
                </div>
            </header>
            <main className='Main'>
                <Outlet />
            </main>

        </>

    )
}