import { FC, useState } from 'react';
import { AnOptionsSets, Dropdown } from '../Dropdown';
import './statisitcselect.scss';
import { NOOP } from '@/utils';

interface StatisitcSelectProps {
    onSelect?: (newValue: string) => void
}

export const StatisitcSelect: FC<StatisitcSelectProps> = ({ onSelect = NOOP }) => {
    const [selectedValue, setSelectedValue] = useState('weekAgo0')

    const handleChange = (e?: React.SyntheticEvent) => {
        const target = e?.currentTarget;
        if (target instanceof HTMLElement && target.dataset && target.dataset.selectvalue) {
            const newValue = target.dataset.selectvalue
            setTimeout(() => {
                setSelectedValue(newValue)
                onSelect(newValue)
            }, 200)
        }
    }

    const getTriggerInner = (): string => {
        switch (selectedValue) {
            case 'weekAgo0':
                return 'Эта неделя';
            case 'weekAgo1':
                return 'Прошедшая неделя';
            case 'weekAgo2':
                return '2 недели назад';
            default:
                return ''
        }
    }

    const list: AnOptionsSets[] = [
        {
            id: 'first',
            optionProps: {
                'data-selectvalue': 'weekAgo0',
                'data-selected': selectedValue === 'weekAgo0'
            },
            inner: <span>Эта неделя</span>,
            itemOnClick: handleChange
        },
        {
            id: 'second',
            optionProps: {
                'data-selectvalue': 'weekAgo1',
                'data-selected': selectedValue === 'weekAgo1'
            },
            inner: <span>Прошедшая неделя</span>,
            itemOnClick: handleChange
        },
        {
            id: 'third',
            optionProps: {
                'data-selectvalue': 'weekAgo2',
                'data-selected': selectedValue === 'weekAgo2'
            },
            inner: <span>2 недели назад</span>,
            itemOnClick: handleChange
        },
    ]
    return (
        <Dropdown
            optionsSettings={list}
            triggerInner={getTriggerInner()}
            index='select'
            additCss={{
                dropdownCss: 'StatisticSelect',
                triggerCss: 'StatisticSelect__Trigger',
                menuCss: 'StatisticSelect__List',
                itemCss: 'StatisticSelect__Item'
            }}
        />
    )
}