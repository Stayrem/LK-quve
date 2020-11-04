import { nanoid } from 'nanoid';
import { MAX_ID_LENGTH } from './constants';

export const addItem = (list) => {
  list.push({ id: nanoid(MAX_ID_LENGTH), value: 0 });
  return list;
};

export const removeItem = (list, id) => list.filter((spending) => spending.id !== id);

export const editDataListItem = (editedItem, data) => {
  const newData = data;
  const foundIndex = newData.findIndex((i) => i.id === editedItem.id);
  newData[foundIndex] = editedItem;

  return newData;
};
