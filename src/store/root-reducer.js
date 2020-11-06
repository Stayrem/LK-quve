import { combineReducers } from 'redux';

import dateReducer from './reducers/date-reducer';
import spendinsDataReducer from './reducers/spendings-reducer';
import incomesDataReducer from './reducers/incomes-reducer';
import costsDataReducer from './reducers/costs-reducer';
import savingsDataReducer from './reducers/savings-reducer';
import historyDataReducer from './reducers/history-reducer';

export default combineReducers({
  date: dateReducer,
  spendings: spendinsDataReducer,
  incomes: incomesDataReducer,
  costs: costsDataReducer,
  savings: savingsDataReducer,
  history: historyDataReducer,
});
