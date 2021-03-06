import { DateTime } from 'luxon';
import dictionary from '@utils/dictionary';

export const getSumByArray = (list) => list.reduce((acc, current) => {
  return acc + current.value;
}, 0);

export const getFormatedNumber = (number) => number.toLocaleString();

export const getBeginOfDay = (date) => DateTime.fromMillis(date).toUTC().startOf('day').ts;

export const getBeginOfMonth = (date) => DateTime.fromMillis(date).toUTC().startOf('month').ts;

export const getPercentFromValue = (value, type, incomes) => ((type === dictionary.SAVINGS_INPUT_TYPE_VALUE)
  ? Math.round((value / incomes) * 100)
  : value);

export const getAbsFromValue = (value, type, incomes) => ((type === dictionary.SAVINGS_INPUT_TYPE_PERCENTS)
  ? Math.round((value * incomes) / 100)
  : value);
