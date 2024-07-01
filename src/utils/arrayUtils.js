import {isArray} from 'lodash';

export const isArrayEmpty = item => {
  if (!isArray(item)) return true;
  else return item.length === 0;
};
