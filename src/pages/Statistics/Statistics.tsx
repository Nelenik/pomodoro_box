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
import { useEffect, useMemo, useState } from 'react';
import { filterByWeek } from '@/utils/WeeksInterval';
import { OneDay } from '@/types/metriks';

type Metriks = {
    [key: string]: OneDay;
};

type EntryMetriks = [string, OneDay][]
type WeekData = {
    [key: string]: [string, OneDay][];
};


export const Statistics = () => {
    useDocTitle()
    const metriks: Metriks = JSON.parse(
        localStorage.getItem("pomodoroMetriks") || "{}")

    const weeks: WeekData = useMemo(() => {
        const entriesFromMetriks: EntryMetriks = Object.entries(metriks);
        return {
            weekAgo0: entriesFromMetriks.filter(filterByWeek('weekAgo0')),
            weekAgo1: entriesFromMetriks.filter(filterByWeek('weekAgo1')),
            weekAgo2: entriesFromMetriks.filter(filterByWeek('weekAgo2')),
        }
    }, [])

    const [activeWeek, setActiveWeek] = useState('weekAgo0');

    const now = new Date()
    const [activeDay, setActiveDay] = useState(now.toDateString())

    const activeDayData = weeks[activeWeek].find(el => el[0] === activeDay)
    console.log(activeDayData)

    const handleSelect = (value: string) => {
        setActiveWeek(value)
    }

    return (
        <div className='container StatisticPage'>
            <div className="StatisticPage__Top">
                <h1 className="mg-reset StatisticPage__Title">
                    Ваша активность
                </h1>
                <div className="StatisticPage__Select">
                    <StatisitcSelect onSelect={handleSelect} />
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