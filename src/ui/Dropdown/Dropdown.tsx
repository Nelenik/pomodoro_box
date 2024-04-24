import { FC, ReactNode, useState } from 'react';
import './dropdown.scss';
interface DropdownProps {
    additCss?: {
        dropdownCss?: string,
        triggerCss?: string,
        menuCss?: string,
        itemCss?: string
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buttonInner: any,
    list: ({
        id: string,
        inner: ReactNode
    })[]

}

const defCss = {
    dropdownCss: '',
    triggerCss: '',
    menuCss: '',
    itemCss: ''
}

export const Dropdown: FC<DropdownProps> = ({ additCss = {}, buttonInner, list }) => {
    const { dropdownCss, triggerCss, menuCss, itemCss } = { ...defCss, ...additCss }
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <div className={`${dropdownCss} Dropdown`}>
            <button
                type='button'
                className={`btn-reset ${triggerCss} Dropdown__Trigger`}
                onClick={handleClick}
            >
                {buttonInner}
            </button>
            {isOpen &&
                <ul className={`mg-reset ${menuCss} Dropdown__Menu`}>
                    {
                        list.map(item => {
                            return (
                                <li
                                    className={`${itemCss} Dropdown__Item`}
                                    key={item.id}
                                >
                                    {item.inner}
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}