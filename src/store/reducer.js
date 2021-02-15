import { DateTime } from 'luxon';
import { getBeginOfDay } from '@utils/functions';
import Type from './action-types';

const initialState = {
  fetchError: false,
  date: getBeginOfDay(DateTime.local().ts),
  isDateChanged: false,

  user: {
    accessToken: null,
    id: null,
    full_name: null,
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

  currentSpendings: [],
  currentSpendingsSum: null,
  prevDaysSpendingsSum: null,
  isSpendingsFetched: false,

  currentSaldo: [],
  isSaldoFetched: false,
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
    case Type.SET_SPENDINGS_DATA:
      return {
        ...state,
        ...payload,
        isSpendingsFetched: true,
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
    case Type.SET_SAVINGS_DATA:
      return {
        ...state,
        ...payload,
        isSavingsFetched: true,
      };
    case Type.SET_SALDO_DATA:
      return {
        ...state,
        ...payload,
        isSaldoFetched: true,
      };
    case Type.SET_DATE:
      return {
        ...state,
        date: payload,
        isSpendingsFetched: false,
        isIncomesFethed: false,
        isCostsFetched: false,
        isSavingsFetched: false,
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
