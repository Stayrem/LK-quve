import { combineReducers } from 'redux';

import Type from '../action-types';

const overviewDataReducer = (state = {}, action) => {
  switch (action.type) {
    case Type.FETCH_OVERVIEW_DATA:
      return action.payload;
    default:
      return state;
  }
};

const saldoDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_SALDO_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  data: overviewDataReducer,
  saldo: saldoDataReducer,
});
