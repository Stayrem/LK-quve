import { combineReducers } from 'redux';
import Type from '../action-types';

const incomesDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_INCOMES_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  data: incomesDataReducer,
});
