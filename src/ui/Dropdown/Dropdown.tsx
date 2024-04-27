import { FC, ReactNode } from 'react';
import './dropdown.scss';
import { useDropdown } from './useDropdown';

const NOOP = () => { }
interface DropdownProps {
    additCss?: {
        dropdownCss?: string,
        triggerCss?: string,
        menuCss?: string,
        itemCss?: string
    },
    index?: number,
    isActiveDropdown?: boolean,
    dropdownOnClick?: () => void,
    As?: 'a' | 'button',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buttonInner: any,
    list: ({
        id: string,
        inner: ReactNode,
        itemOnClick?: () => void,
    })[]

}

const defCss = {
    dropdownCss: '',
    triggerCss: '',
    menuCss: '',
    itemCss: ''
}

export const Dropdown: FC<DropdownProps> = ({ index = 0, isActiveDropdown = false, dropdownOnClick = NOOP, As = 'button', additCss = {}, buttonInner, list }) => {
    const { dropdownCss, triggerCss, menuCss, itemCss } = { ...defCss, ...additCss }
    const { isOpen, menuRef, triggerRef, dropdownRef, handleTriggerClick, closeMenu } = useDropdown(isActiveDropdown)
    const manageOpeningClass = isOpen && 'Dropdown__Menu--open' || '';

    return (
        <div className={`${dropdownCss} Dropdown`} onClick={dropdownOnClick} ref={dropdownRef}>
            <button
                ref={triggerRef}
                type='button'
                className={`btn-reset ${triggerCss} Dropdown__Trigger`}
                onClick={handleTriggerClick}
                aria-expanded={isOpen}
                aria-controls={`dropMenu-${index}`}
            >
                {buttonInner}
            </button>
            <div
                id={`dropMenu-${index}`}
                ref={menuRef}
                className={`${menuCss} Dropdown__Menu ${manageOpeningClass}`}
            >
                {
                    list.map(({ id, inner, itemOnClick = NOOP }) => {
                        return (
                            <As
                                key={id}
                                className={`${itemCss} Dropdown__MenuItem`}
                                onClick={() => {
                                    itemOnClick()
                                    closeMenu()
                                    triggerRef.current?.focus()
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