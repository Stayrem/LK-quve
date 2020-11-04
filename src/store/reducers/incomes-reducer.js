import { combineReducers } from 'redux';

import Type from '../action-types';

const incomesListReducer = (state = [], action) => {
  switch (action.type) {
    case Type.SET_TOTAL_INCOMES_DATA:
      return action.payload;
    default:
      return state;
  }
};

const dateReducer = (state = null, action) => {
  switch (action.type) {
    case Type.SET_TOTAL_DATE:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  incomesList: incomesListReducer,
  date: dateReducer,
});
