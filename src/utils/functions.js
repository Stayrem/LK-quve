import { DateTime } from 'luxon';
import dictionary from '@utils/dictionary';

export const getSumByArray = (list) => list.reduce((acc, current) => {
  return acc + current.value;
}, 0);

export const getFormatedNumber = (number) => number
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

export const getBeginOfDay = (date) => DateTime.fromMillis(date).startOf('day').ts;

export const getBeginOfMonth = (date) => DateTime.fromMillis(date).startOf('month').ts;

export const getPercentFromValue = (value, type, incomes) => ((type === dictionary.SAVINGS_INPUT_TYPE_VALUE)
  ? Math.round((value / incomes) * 100)
  : value);

export const getAbsFromValue = (value, type, incomes) => ((type === dictionary.SAVINGS_INPUT_TYPE_PERCENTS)
  ? Math.round((value * incomes) / 100)
  : value);

export const parseJwt = (token) => JSON.parse(atob(token.split('.')[1]));
