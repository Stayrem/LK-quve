import moment from 'moment';
import 'moment/locale/ru';
import Type from './action-types';

const initialState = {
  info: {},
  fetchError: false,
  date: moment().unix() * 1000,
  isInfoFetched: false,
  incomes: [],
  isIncomesFethed: false,
  costs: [],
  isCostsFetched: false,
  mounthSpendings: [],
  daySpendings: [],
  isSpendingsFetched: false,
  savings: [],
  savingsSelectedMounth: 0,
  isSavingsFetched: false,
  currentSavingSum: null,
  incomesSum: null,
  mounthSpendingsSum: null,
  daySpendingsSum: null,
  moneyRemains: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Type.SET_USER_INFO:
      return {
        ...state,
        info: payload,
        isInfoFetched: true,
      };
    case Type.SET_IS_FETCH_FAILED:
      return {
        ...state,
        fetchError: payload,
      };
    case Type.SET_MOUNTH_SPENDINGS_DATA:
      return {
        ...state,
        mounthSpendings: payload,
        isSpendingsFetched: true,
      };
    case Type.SET_DAY_SPENDINGS_DATA:
      return {
        ...state,
        daySpendings: payload,
      };
    case Type.SET_INCOMES_DATA:
      return {
        ...state,
        ...payload,
        isIncomesFethed: true,
      };
    case Type.SET_COSTS_DATA:
      return {
        ...state,
        ...payload,
        isCostsFetched: true,
      };
    case Type.SET_SAVINGS:
      return {
        ...state,
        ...payload,
        isSavingsFetched: true,
      };
    case Type.SET_DAILY_BUDJET:
      return {
        ...state,
        dailyBudjet: payload,
      };
    case Type.SET_DATE:
      return {
        ...state,
        date: payload,
      };
    case Type.SET_OVERVIEW_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const wrappedReducer = (state, action) => {
  if (action.type === Type.RESET_STORE) {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};
export default wrappedReducer;
