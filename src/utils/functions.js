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
