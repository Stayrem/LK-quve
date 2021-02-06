import moment from 'moment';
import dictionary from '@utils/dictionary';

export const getSumByArray = (list) => list.reduce((acc, current) => {
  return acc + current.value;
}, 0);

export const getFormatedNumber = (number) => number
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

export const getBeginOfDay = (date) => moment(date * 1000).utc().startOf('day').unix();

export const getBeginOfMonth = (date) => moment(date * 1000).utc().startOf('month').unix();

export const getPercentFromValue = (value, type, incomes) => ((type === dictionary.SAVINGS_INPUT_TYPE_VALUE)
  ? Math.round((value / incomes) * 100)
  : value);

export const getAbsFromValue = (value, type, incomes) => ((type === dictionary.SAVINGS_INPUT_TYPE_PERCENTS)
  ? Math.round((value * incomes) / 100)
  : value);
