import moment from 'moment';

function getDateDiff(date1: any, date2: any) {
    date1 = moment(date1);
    date2 = moment(date2);
    let years = date1.diff(date2, 'year');
    date2.add(years, 'years');

    let months = date1.diff(date2, 'months');
    date2.add(months, 'months');

    let days = date1.diff(date2, 'days');
    date2.add(days, 'days');

    let hours = date1.diff(date2, 'hours');
    date2.add(hours, 'hours');

    let minutes = date1.diff(date2, 'minutes');
    date2.add(minutes, 'minutes');

    let seconds = date1.diff(date2, 'seconds');
    //console.log(years + ' years ' + months + ' months ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds');
    return { years, months, days, hours, minutes, seconds };
}
export { getDateDiff };
