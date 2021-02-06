import moment from 'moment';
import 'moment/locale/ru';
import { getBeginOfDay } from '@utils/functions';
import Type from './action-types';

const initialState = {
  fetchError: false,
  date: getBeginOfDay(moment().utc().unix()),
  isDateChanged: false,

  user: {
    accessToken: null,
    name: null,
    email: null,
  },
  isInfoFetched: false,

  currentIncomes: [],
  currentIncomesSum: null,
  isIncomesFethed: false,

  currentCosts: [],
  currentCostsSum: null,
  isCostsFetched: false,

  currentYearSavings: [],
  currentSavings: null,
  isSavingsFetched: false,

  currentMonthSpendings: [],
  isSpendingsFetched: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Type.SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        isInfoFetched: true,
      };
    case Type.SET_USER_ACCESS_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: payload,
        },
      };
    case Type.SET_IS_FETCH_FAILED:
      return {
        ...state,
        fetchError: payload,
      };
    case Type.SET_MONTH_SPENDINGS_DATA:
      return {
        ...state,
        currentMonthSpendings: payload,
        isSpendingsFetched: true,
      };
    case Type.SET_DAY_SPENDINGS_DATA:
      return {
        ...state,
        currentDaySpendings: payload,
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
    case Type.SET_DATE:
      return {
        ...state,
        date: payload,
      };
    case Type.SET_IS_DATE_CHANGED:
      return {
        ...state,
        isDateChanged: payload,
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
    return reducer(initialState, action);
  }
  return reducer(state, action);
};
export default wrappedReducer;
