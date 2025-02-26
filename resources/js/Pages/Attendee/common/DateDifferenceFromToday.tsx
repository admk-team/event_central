import React, { useEffect, useState } from 'react'
import { getDateDiff } from '../../../common/helpers';
import moment from 'moment';

function DateDifferenceFromToday({ date1, ContainerOffSet }: any) {
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let diff = getDateDiff(date1, moment());
            setYears(diff.years);
            setMonths(diff.months);
            setDays(diff.days);
            setHours(diff.hours);
            setMinutes(diff.minutes);
            setSeconds(diff.seconds);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div style={{ position: 'relative', top: '-130px', width: '100%' }} className='d-flex justify-content-center'>
            <div className='d-flex flex-row justify-content-between' style={{ width: '80%' }}>
                {years > 0 && < span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{years}</span>
                    <span className='date-diff-label'>YEARS</span>
                </span>}
                {months > 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{months}</span>
                    <span className='date-diff-label'>MONTHS</span>
                </span>}
                {days > 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{days}</span>
                    <span className='date-diff-label'>DAYS</span>
                </span>}
                {hours > 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{hours}</span>
                    <span className='date-diff-label'>HOURS</span>
                </span>}
                {minutes > 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{minutes}</span>
                    <span className='date-diff-label'>MINUTES</span>
                </span>}
                {seconds > 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{seconds}</span>
                    <span className='date-diff-label'>SECONDS</span>
                </span>}
            </div>
        </div>
    )
}
export default DateDifferenceFromToday
