import React, { useEffect, useState } from 'react'
import { getDateDiff } from '../../../common/helpers';
import moment from 'moment';

function DateDifferenceFromToday({ date1, top = '-130px' }: any) {
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    // const
    useEffect(() => {
        const interval = setInterval(() => {
            let diff = getDateDiff(date1, moment());
            setYears(diff.years);
            setMonths(diff.months);
            setDays(diff.days);
            setHours(diff.hours);
            setMinutes(diff.minutes);
            setSeconds(diff.seconds);
            // console.log(diff);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className='d-flex justify-content-center w-100'>
            {moment(date1).diff(moment()) > 0 && <div className='d-flex flex-row justify-content-between w-50'>
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
                {hours >= 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{hours}</span>
                    <span className='date-diff-label'>HOURS</span>
                </span>}
                {minutes >= 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{minutes}</span>
                    <span className='date-diff-label'>MINUTES</span>
                </span>}
                {seconds >= 0 && <span className="d-flex flex-column align-items-center" >
                    <span className='date-diff-value'>{seconds}</span>
                    <span className='date-diff-label'>SECONDS</span>
                </span>}
            </div>}

        </div>
    )
}
export default DateDifferenceFromToday
