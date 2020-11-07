export const getSumByArray = (arr) => {
  const reducer = (accumulator, currentItem) => {
    if (currentItem.value !== '' && currentItem.status !== false) {
      return accumulator + parseInt(currentItem.value, 10);
    }
    return accumulator;
  };
  return arr.reduce(reducer, 0);
};
