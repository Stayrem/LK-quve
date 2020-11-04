import { combineReducers } from 'redux';

import dateReducer from './reducers/date-reducer';
import overviewDataReducer from './reducers/overview-reducer';
import incomesDataReducer from './reducers/incomes-reducer';
import costsDataReducer from './reducers/costs-reducer';
import savingsDataReducer from './reducers/savings-reducer';

export default combineReducers({
  date: dateReducer,
  overview: overviewDataReducer,
  incomes: incomesDataReducer,
  costs: costsDataReducer,
  savings: savingsDataReducer,
});
