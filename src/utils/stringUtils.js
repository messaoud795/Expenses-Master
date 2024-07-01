import {isNil, isString} from 'lodash';

export function containsOnlyAlphanumeric(text) {
  const alphanumericPattern = /^[a-zA-Z0-9]+$/;
  return alphanumericPattern.test(text);
}

export const generateUniqueId = () => {
  const timestamp = new Date().getTime(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
  const uniqueId = `${timestamp}-${randomNum}`;
  return uniqueId;
};

export const formatLabel = label => {
  if (isString(label)) {
    if (label.length > 10) return label.slice(0, 7) + '...';
    else return label;
  }
};

export function isValidJSON(data) {
  if (isNil(data)) return false;
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
}

export const isStringNotEmpty = str => {
  return isString(str) && str?.length > 0;
};
