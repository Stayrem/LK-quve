import moment from 'moment';

export const getSumByArray = (arr) => {
  const reducer = (accumulator, currentItem) => {
    if (currentItem.value !== '' && currentItem.status !== false) {
      return accumulator + parseInt(currentItem.value, 10);
    }
    return accumulator;
  };
  return arr.reduce(reducer, 0);
};

export const getFormatedNumber = (number) => number
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

export const getBeginOfDay = (date) => moment(date * 1000).utc().startOf('day').unix();

export const getBeginOfMonth = (date) => moment(date * 1000).utc().startOf('month').unix();
