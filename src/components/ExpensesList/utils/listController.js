import { addItem, removeItem } from '@utils/data-list-controllers.js';
import inputTypesDict from '../inputTypesDict';

const keyDownHandler = (list, evt, type, id, ref) => {
  console.log(evt.key, type);
  if (evt.key === 'Enter' && type === inputTypesDict.value) {
    console.log(1)
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

export default keyDownHandler;
