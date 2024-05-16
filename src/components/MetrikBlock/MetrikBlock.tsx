import { FC } from 'react';
import './metrikblock.scss';

interface MetrikBlockProps {
    cssModificator?: string,
    name: string,
    value: string,
    pic: React.ReactNode
}
export const MetrikBlock: FC<MetrikBlockProps> = ({ name, value, pic, cssModificator }) => {
    const modificator = cssModificator ? `Metrik--${cssModificator}` : ''
    return (
        <div className={`Metrik ${modificator}`}>
            <div className="Metrik__Left">

                <h3 className="Metrik__Name mg-reset">
                    {name}
                </h3>
                <span className="Metrik__Value">
                    {value}
                </span>
            </div>
            {pic}
        </div>
    )
}