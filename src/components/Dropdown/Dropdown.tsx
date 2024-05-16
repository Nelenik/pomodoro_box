import { FC, ReactNode } from 'react';
import './dropdown.scss';
import { useDropdown } from './useDropdown';

const NOOP = () => { }
export interface AnOptionsSets {
    id: string,
    optionProps?: {
        [key: string]: unknown
    },
    inner: ReactNode,
    itemOnClick?: (e?: React.SyntheticEvent) => void,
}
interface DropdownProps {
    additCss?: {
        dropdownCss?: string,
        triggerCss?: string,
        menuCss?: string,
        itemCss?: string
    },
    index?: string,
    isActiveDropdown?: boolean,
    dropdownOnClick?: () => void,
    As?: 'a' | 'button',
    triggerInner: ReactNode | string,
    optionsSettings: AnOptionsSets[]

}

const defCss = {
    dropdownCss: '',
    triggerCss: '',
    menuCss: '',
    itemCss: ''
}

export const Dropdown: FC<DropdownProps> = ({ index = '0', isActiveDropdown = true, dropdownOnClick = NOOP, As = 'button', additCss = {}, triggerInner, optionsSettings }) => {
    const { dropdownCss, triggerCss, menuCss, itemCss } = { ...defCss, ...additCss }
    const { isOpen, menuRef, triggerRef, dropdownRef, handleTriggerClick, closeMenu } = useDropdown(isActiveDropdown)
    const manageOpeningClass = isOpen && 'Dropdown__Menu--open' || '';

    return (
        <div className={` Dropdown ${dropdownCss}`} onClick={dropdownOnClick} ref={dropdownRef} {...isActiveDropdown && { 'z-index': 10 }}>
            <button
                ref={triggerRef}
                type='button'
                className={` Dropdown__Trigger ${triggerCss}`}
                onClick={handleTriggerClick}
                aria-expanded={isOpen}
                aria-controls={`dropMenu-${index}`}
            >
                {triggerInner}
            </button>
            <div
                id={`dropMenu-${index}`}
                ref={menuRef}
                className={` Dropdown__Menu ${manageOpeningClass} ${menuCss}`}
            >
                {
                    optionsSettings.map(({ id, inner, optionProps = {}, itemOnClick = NOOP }) => {
                        return (
                            <As
                                key={id}
                                {...optionProps}
                                className={`Dropdown__MenuItem ${itemCss}`}
                                onClick={(e) => {
                                    if (!(e.target as HTMLElement).closest('.Dropdown__MenuItem')) return;
                                    e.preventDefault()
                                    itemOnClick(e)
                                    closeMenu()
                                }}
                            >
                                {inner}
                            </As>
                        )
                    })
                }
            </div>
        </div>
    )
}