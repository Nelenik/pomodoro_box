import { StatisitcSelect } from '@/components/StatisitcSelect';
import './statistics.scss';
import useDocTitle from '@/hooks/useDocTitle';
import { TomatoesCount } from '@/components/TomatoesCount';
import { MetrikBlock } from '@/components/MetrikBlock';
import FocusSvg from 'assets/focus-svg.svg?react';
import PauseSvg from 'assets/pause-svg.svg?react';
import StopSvg from 'assets/stop-svg.svg?react';
import { TotalTime } from '@/components/TotalTime';
import { getPauseTimeString, getTotalTimeString } from '@/utils/getTimeString';

export const Statistics = () => {
    useDocTitle()

    return (
        <div className='container StatisticPage'>
            <div className="StatisticPage__Top">
                <h1 className="mg-reset StatisticPage__Title">
                    Ваша активность
                </h1>
                <div className="StatisticPage__Select">
                    <StatisitcSelect />
                </div>
            </div>
            <div className="StatisticPage__TotalTime">
                <TotalTime totalTime={getTotalTimeString(3060)} />
            </div>
            <div className="StatisticPage__Chart" style={{ backgroundColor: '#F4F4F4' }}>
                Chart
            </div>
            <div className="StatisticPage__TomatoesCount">
                <TomatoesCount tomatoesCount={10} />
            </div>
            <div className="StatisticPage__Bottom">
                <MetrikBlock
                    name={'Фокус'}
                    value={'27%'}
                    pic={<FocusSvg className='Metrik__Svg' />}
                    cssModificator='focus'
                />
                <MetrikBlock
                    name={'Время на паузе'}
                    value={getPauseTimeString(9000)}
                    pic={<PauseSvg className='Metrik__Svg' />}
                    cssModificator='pause'
                />
                <MetrikBlock
                    name={'Остановки'}
                    value={'14'}
                    pic={<StopSvg className='Metrik__Svg' />}
                    cssModificator='stop'
                />
            </div>
        </div>
    )
}