import { useState } from 'react';
import { AnOptionsSets, Dropdown } from '../Dropdown';
import './statisitcselect.scss';

export const StatisitcSelect = () => {
    const [selectedValue, setSelectedValue] = useState('current')

    const handleChange = (e?: React.SyntheticEvent) => {
        const target = e?.currentTarget;
        if (target instanceof HTMLElement && target.dataset && target.dataset.selectvalue) {
            const newState = target.dataset.selectvalue
            setTimeout(() => {
                setSelectedValue(newState)
            }, 200)
        }
    }

    const getTriggerInner = (): string => {
        switch (selectedValue) {
            case 'current':
                return 'Эта неделя';
            case 'one ago':
                return 'Прошедшая неделя';
            case 'two ago':
                return '2 недели назад';
            default:
                return ''
        }
    }

    const list: AnOptionsSets[] = [
        {
            id: 'first',
            optionProps: {
                'data-selectvalue': 'current',
                'data-selected': selectedValue === 'current'
            },
            inner: <span>Эта неделя</span>,
            itemOnClick: handleChange
        },
        {
            id: 'second',
            optionProps: {
                'data-selectvalue': 'one ago',
                'data-selected': selectedValue === 'one ago'
            },
            inner: <span>Прошедшая неделя</span>,
            itemOnClick: handleChange
        },
        {
            id: 'third',
            optionProps: {
                'data-selectvalue': 'two ago',
                'data-selected': selectedValue === 'two ago'
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