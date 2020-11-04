import { combineReducers } from 'redux';
import Type from '../action-types';

const costsDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_COSTS_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  data: costsDataReducer,
});
