import moment from 'moment';

export const getSumByArray = (list) => list.reduce((acc, current) => {
  return acc + current.value;
}, 0);

export const getFormatedNumber = (number) => number
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

export const getBeginOfDay = (date) => moment(date * 1000).utc().startOf('day').unix();

export const getBeginOfMonth = (date) => moment(date * 1000).utc().startOf('month').unix();
