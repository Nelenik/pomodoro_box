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
import { useMemo, useState } from 'react';
import { filterByWeek, getDayName } from '@/utils/WeeksInterval';
import { EntryMetriks, PomodoroMetriks, WeekData } from '@/types/metriks';
import { useSettingsContext } from '@/reducers_providers/SettingsProvider';
import { calculateFocus } from '@/utils/calculateFocus';


export const Statistics = () => {
    useDocTitle()
    const { appSettings } = useSettingsContext()
    const weeks: WeekData = useMemo(() => {
        const metriks: PomodoroMetriks = JSON.parse(
            localStorage.getItem("pomodoroMetriks") || "{}")
        const entriesFromMetriks: EntryMetriks = Object.entries(metriks);
        return {
            weekAgo0: entriesFromMetriks.filter(filterByWeek('weekAgo0')),
            weekAgo1: entriesFromMetriks.filter(filterByWeek('weekAgo1')),
            weekAgo2: entriesFromMetriks.filter(filterByWeek('weekAgo2')),
        }
    }, [])

    const [activeWeek, setActiveWeek] = useState('weekAgo0');
    const now = new Date()
    const [activeDay, setActiveDay] = useState(now.getDay())
    console.log(weeks[activeWeek])

    const [, activeDayData] = weeks[activeWeek].find(el => {
        const dateFromEl = new Date(el[0])
        return dateFromEl.getDay() === activeDay
    }) || []


    const handleSelect = (value: string) => {
        setActiveWeek(value)
    }

    const getFocusString = (): string => {
        if (!activeDayData) return '0%';
        const { totalTime, completedTomatoes } = activeDayData
        return `${calculateFocus(totalTime, completedTomatoes, appSettings.tomatoDuration)}%`
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
                <TotalTime
                    totalTime={
                        activeDayData ? getTotalTimeString(activeDayData.totalTime) : null
                    }
                    dayName={getDayName(activeDay)}
                />
            </div>
            <div className="StatisticPage__Chart" style={{ backgroundColor: '#F4F4F4' }}>
                Chart
            </div>
            <div className="StatisticPage__TomatoesCount">
                <TomatoesCount tomatoesCount={
                    activeDayData ? activeDayData.completedTomatoes : 0
                } />
            </div>
            <div className="StatisticPage__Bottom">
                <MetrikBlock
                    name={'Фокус'}
                    value={`${getFocusString()}`}
                    pic={<FocusSvg className='Metrik__Svg' />}
                    cssModificator={activeDayData ? 'focus' : 'no-data'}
                />
                <MetrikBlock
                    name={'Время на паузе'}
                    value={getPauseTimeString(activeDayData ? activeDayData.timeOnPause : 0)}
                    pic={<PauseSvg className='Metrik__Svg' />}
                    cssModificator={activeDayData ? 'pause' : 'no-data'}
                />
                <MetrikBlock
                    name={'Остановки'}
                    value={activeDayData ? activeDayData.stopCount.toString() : '0'}
                    pic={<StopSvg className='Metrik__Svg' />}
                    cssModificator={activeDayData ? 'stop' : 'no-data'}
                />
            </div>
        </div>
    )
}