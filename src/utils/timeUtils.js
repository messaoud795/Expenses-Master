import {isDate} from 'lodash';
import moment from 'moment';
import {DATE_FORMATS} from '../constants/generalConstants';

function getMonthNameFromIndex(monthIndex) {
  if (monthIndex >= 0 && monthIndex < 12) {
    return moment().month(monthIndex).format('MMM');
  } else {
    return 'Invalid month index';
  }
}

export function getLastSixMonthsDates() {
  const today = new Date();
  const lastSixMonthsDates = [];

  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    lastSixMonthsDates.push(targetDate);
  }

  return lastSixMonthsDates;
}

export const areMonthsAndYearIdentical = (date1, date2) => {
  if (isDate(date1) && isDate(date2)) {
    return (
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getFullYear() === date2?.getFullYear()
    );
  } else return false;
};

export const getDateMinusTwoMonths = dateString => {
  return moment(dateString)
    .subtract(2, 'months')
    .format(DATE_FORMATS.FULL_DATE);
};

export const formatDateToMonth = dateString => {
  const date = moment(dateString);
  return date.format(DATE_FORMATS.MONTH_YEAR);
};
