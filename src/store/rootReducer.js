import { combineReducers } from 'redux';

import overviewReducer from './reducers/overview-reducer';
import totalIncomes from './reducers/incomes-reducer';

export default combineReducers({
  overview: overviewReducer,
  incomes: totalIncomes,
});
