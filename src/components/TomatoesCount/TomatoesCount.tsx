import './tomatoescount.scss';
import { FC } from 'react';
import NoTomatoesSvg from 'assets/no-tomatoes.svg?react';
import AreTomatoesSvg from 'assets/are-tomatoes.svg?react';
import { getWordEndigs } from '@/utils/getWordEnding';

interface TomatoesCountProps {
    tomatoesCount: number
}

export const TomatoesCount: FC<TomatoesCountProps> = ({ tomatoesCount }) => {
    return (
        <div className="TomatoesCount">
            {
                !tomatoesCount && <NoTomatoesSvg />
                ||
                tomatoesCount && <>
                    <div className="TomatoesCount__Pic">
                        <AreTomatoesSvg />
                        <span>x {tomatoesCount}</span>
                    </div>
                    <div className="TomatoesCount__Footer">
                        {`${tomatoesCount} ${getWordEndigs(tomatoesCount, ['помидор', 'помидора', 'помидоров'])}`}
                    </div>
                </>}
        </div>
    )
}