import inputTypesDict from '../inputTypesDict';

export const removeItem = (list, id) => list.filter((spending) => spending.id !== id);

export const addItem = (list) => {
  list.push({ id: list.length, value: 0 });
  return list;
};

export const keyDownHandler = (list, evt, type, id, ref) => {
  if (evt.key === 'Enter' && type === inputTypesDict.value) {
    return addItem(list);
  }
  if (evt.key === 'Tab') {
    evt.target.focus();
  }
  if (evt.key === 'Delete' && type === inputTypesDict.category) {
    ref.current.focus();
    return removeItem(list, id);
  }
  return list;
};
