import {round} from 'lodash';
import store from '../store/store';

export function isNumber(text) {
  const stringWithoutCommas = text.replace(/,/g, ''); // Remove commas
  return !isNaN(stringWithoutCommas);
}

export const formatKPI = value => {
  const {
    user: {currency},
  } = store.getState();
  if (value) return `${round(value, 1)} ${currency}`;
  else return '-';
};
