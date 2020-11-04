import { combineReducers } from 'redux';

import Type from '../action-types';

const savingsDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_SAVINGS_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  data: savingsDataReducer,
});
