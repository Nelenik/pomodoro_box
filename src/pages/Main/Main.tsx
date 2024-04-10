import './main.scss';
import TomatoMainSvg from 'assets/tomato-main.svg?react'
import useDocTitle from '@/hooks/useDocTitle';

export const Main = () => {
    //change page title
    useDocTitle()
    return (
        <div className='container homePage'>
            <TomatoMainSvg className='tomatoSvg' />
        </div>

    )
}