import { Button } from '../buttons/Button';
import { RoundBtn } from '../buttons/RoundBtn';
import './timer.scss';

export const Timer = () => {
    return (
        <div className='Timer'>
            <div className="Timer__Header">
                <h2 className="mg-reset Timer__TaskName">
                    Сверсать сайт
                </h2>
                <span className="Timer__TomatoCounter">
                    Помидор 1
                </span>
            </div>
            <div className="Timer__TimeBlock">
                <div className="Timer__Time">
                    25:00
                </div>
                <RoundBtn />
            </div>
            <p className="Timer__Descr">
                <span>Задача 1 - </span>
                Сверстать сайт
            </p>
            <div className="Timer__Controls">
                <Button view='green'>
                    Старт
                </Button>
                <Button view='inactive'>
                    Стоп
                </Button>
            </div>
        </div>
    )
}