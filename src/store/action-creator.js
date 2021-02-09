import { nanoid } from 'nanoid';
import {
  getAbsFromValue, getBeginOfMonth, getSumByArray,
} from '@utils/functions';
import { toast } from 'react-toastify';
import dictionary from '@utils/dictionary';
import Type from './action-types';
import fetchData from '../utils/fetch';
import { DateTime } from 'luxon';

/* Actions */

export const setDate = (epoch) => ({
  type: Type.SET_DATE,
  payload: epoch,
});

export const setIsDateChanged = (bool) => ({
  type: Type.SET_IS_DATE_CHANGED,
  payload: bool,
});

export const setUserInfo = (data) => ({
  type: Type.SET_USER_INFO,
  payload: data,
});

export const setUserAccessToken = (data) => ({
  type: Type.SET_USER_ACCESS_TOKEN,
  payload: data,
});

export const setIncomes = (obj) => ({
  type: Type.SET_INCOMES_DATA,
  payload: obj,
});

export const setCosts = (data) => ({
  type: Type.SET_COSTS_DATA,
  payload: data,
});

export const setSavings = (data) => ({
  type: Type.SET_SAVINGS_DATA,
  payload: data,
});

export const setSpendings = (data) => ({
  type: Type.SET_SPENDINGS_DATA,
  payload: data,
});

export const setOverviewData = (obj) => ({
  type: Type.SET_OVERVIEW_DATA,
  payload: obj,
});

export const setIsFetchFailed = (bool) => ({
  type: Type.SET_IS_FETCH_FAILED,
  payload: bool,
});

export const resetStore = () => ({
  type: Type.RESET_STORE,
});

/* Fetches */

export const fetchUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await fetchData('/mocks/info.json', 'GET');
    dispatch(setUserInfo(userInfo));
  } catch (error) {
    toast.error('Не удалось загрузить данные пользователя.');
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchIncomes = () => async (dispatch, getState) => {
  const { date } = getState();
  const currentMonth = getBeginOfMonth(date) / 1000;

  try {
    const currentIncomes = await fetchData(`/api/incomes/?date=${currentMonth}`, 'GET');
    const currentIncomesSum = currentIncomes.length > 0 ? getSumByArray(currentIncomes) : 0;
    dispatch(setIncomes({ currentIncomes, currentIncomesSum }));
  } catch (error) {
    toast.error('Не удалось загрузить доходы.');
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchCosts = () => async (dispatch, getState) => {
  const { date } = getState();
  const currentMonth = getBeginOfMonth(date) / 1000;

  try {
    const currentCosts = await fetchData(`/api/costs/?date=${currentMonth}`, 'GET');
    const currentCostsSum = currentCosts.length > 0 ? getSumByArray(currentCosts) : 0;
    dispatch(setCosts({ currentCosts, currentCostsSum }));
  } catch (error) {
    toast.error('Не удалось загрузить постоянные расходы.');
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchSpendings = () => async (dispatch, getState) => {
  const { date } = getState();
  const currentMonth = getBeginOfMonth(date) / 1000;

  try {
    const response = await fetchData('/mocks/spendings/get.json');
    const { prevDaysSpendingsSum, currentSpendings } = response;
    const currentSpendingsSum = currentSpendings.length > 0 ? getSumByArray(currentSpendings) : 0;
    dispatch(setSpendings({ prevDaysSpendingsSum, currentSpendings, currentSpendingsSum }));
  } catch (error) {
    toast.error('Не удалось загрузить дневные траты.');
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchSavings = () => async (dispatch) => {
  try {
    const savings = await fetchData('/mocks/savings/get.json');
    const { currentSavings, currentYearSavings } = savings;
    dispatch(setSavings({ currentYearSavings, currentSavings }));
  } catch (error) {
    toast.error('Не удалось загрузить сбережения.');
    dispatch(setIsFetchFailed(true));
  }
};

/* Overview */

const calculateOverviewData = () => async (dispatch, getState) => {
  const {
    currentIncomesSum,
    currentCostsSum,
    currentSavings,
    prevDaysSpendingsSum,
    date,
  } = getState();

  const currentDateTime = DateTime.fromMillis(date);
  const currentSavingsSum = getAbsFromValue(currentSavings.value, currentSavings.type, currentIncomesSum);
  const currentProfit = currentIncomesSum - currentCostsSum - currentSavingsSum;
  const currentFixedBudget = currentProfit / currentDateTime.daysInMonth;
  const currentDailyBudget = Math.round(currentFixedBudget * currentDateTime.day - prevDaysSpendingsSum);

  const currentRestValue = currentProfit - prevDaysSpendingsSum;
  const currentRestPercent = currentRestValue > 0
    ? Math.round((currentRestValue / currentIncomesSum) * 100)
    : 0;

  dispatch(setOverviewData({
    currentDailyBudget,
    currentSavingsSum,
    currentRestValue,
    currentRestPercent,
  }));
};

/* CashFlows */

export const addCashFlow = (type) => (dispatch, getState) => {
  let currentCashFlows = [];
  let dispatchedFunction = null;
  let dispatchedObject = {};

  const { currentIncomes, currentCosts, currentSpendings, date } = getState();

  switch (type) {
    case dictionary.DATA_LIST_TYPE_INCOMES:
      currentCashFlows = currentIncomes;
      dispatchedFunction = setIncomes;
      dispatchedObject = {
        currentIncomes: [],
        currentIncomesSum: null,
      };
      break;
    case dictionary.DATA_LIST_TYPE_COSTS:
      currentCashFlows = currentCosts;
      dispatchedFunction = setCosts;
      dispatchedObject = {
        currentCosts: [],
        currentCostsSum: null,
      };
      break;
    case dictionary.DATA_LIST_TYPE_SPENDINGS:
      currentCashFlows = currentSpendings;
      dispatchedFunction = setSpendings;
      dispatchedObject = {
        currentSpendings: [],
        currentSpendingsSum: null,
      };
      break;
    default:
      toast.error('Не выбран тип CashFlow-объекта.');
      return false;
  }

  const newCashFlowsList = [...currentCashFlows, {
    id: nanoid(),
    name: '',
    value: null,
    status: true,
    date: getBeginOfMonth(date),
    isNew: true,
  }];

  switch (type) {
    case dictionary.DATA_LIST_TYPE_INCOMES:
      dispatchedObject = {
        currentIncomes: newCashFlowsList,
        currentIncomesSum: getSumByArray(newCashFlowsList),
      };
      break;
    case dictionary.DATA_LIST_TYPE_COSTS:
      dispatchedObject = {
        currentCosts: newCashFlowsList,
        currentCostsSum: getSumByArray(newCashFlowsList),
      };
      break;
    case dictionary.DATA_LIST_TYPE_SPENDINGS:
      dispatchedObject = {
        currentSpendings: newCashFlowsList,
        currentSpendingsSum: getSumByArray(newCashFlowsList),
      };
      break;
    default:
      break;
  }

  dispatch(dispatchedFunction(dispatchedObject));
};

export const deleteCashFlow = (item, type) => (dispatch, getState) => {
  let currentCashFlows = [];
  let dispatchedFunction = null;
  let dispatchedObject = {};
  let requestURL = '';

  const { currentIncomes, currentCosts, currentSpendings } = getState();

  switch (type) {
    case dictionary.DATA_LIST_TYPE_INCOMES:
      currentCashFlows = currentIncomes;
      dispatchedFunction = setIncomes;
      dispatchedObject = {
        currentIncomes: [],
        currentIncomesSum: null,
      };
      requestURL = `/api/incomes/${item.id}/`;
      break;
    case dictionary.DATA_LIST_TYPE_COSTS:
      currentCashFlows = currentCosts;
      dispatchedFunction = setCosts;
      dispatchedObject = {
        currentCosts: [],
        currentCostsSum: null,
      };
      requestURL = `/api/costs/${item.id}/`;
      break;
    case dictionary.DATA_LIST_TYPE_SPENDINGS:
      currentCashFlows = currentSpendings;
      dispatchedFunction = setSpendings;
      dispatchedObject = {
        currentSpendings: [],
        currentSpendingsSum: null,
      };
      requestURL = `/api/spendings/${item.id}/`;
      break;
    default:
      toast.error('Не выбран тип CashFlow-объекта.');
      return false;
  }

  let newCashFlowsList = currentCashFlows.map((cashFlow) => {
    if (cashFlow.id === item.id) {
      return { ...cashFlow, isPending: true };
    }
    return cashFlow;
  });

  switch (type) {
    case dictionary.DATA_LIST_TYPE_INCOMES:
      dispatchedObject = {
        ...dispatchedObject,
        currentIncomes: newCashFlowsList,
      };
      break;
    case dictionary.DATA_LIST_TYPE_COSTS:
      dispatchedObject = {
        ...dispatchedObject,
        currentCosts: newCashFlowsList,
      };
      break;
    case dictionary.DATA_LIST_TYPE_SPENDINGS:
      dispatchedObject = {
        ...dispatchedObject,
        currentSpendings: newCashFlowsList,
      };
      break;
    default:
      break;
  }

  dispatch(dispatchedFunction(dispatchedObject));

  if (!item.isNew) {
    try {
      fetchData(requestURL, 'DELETE')
        .then(() => {
          newCashFlowsList = currentCashFlows.filter((cashFlow) => cashFlow.id !== item.id);

          switch (type) {
            case dictionary.DATA_LIST_TYPE_INCOMES:
              dispatchedObject = {
                currentIncomes: newCashFlowsList,
                currentIncomesSum: getSumByArray(newCashFlowsList),
              };
              break;
            case dictionary.DATA_LIST_TYPE_COSTS:
              dispatchedObject = {
                currentCosts: newCashFlowsList,
                currentCostsSum: getSumByArray(newCashFlowsList),
              };
              break;
            case dictionary.DATA_LIST_TYPE_SPENDINGS:
              dispatchedObject = {
                currentSpendings: newCashFlowsList,
                currentSpendingsSum: getSumByArray(newCashFlowsList),
              };
              break;
            default:
              break;
          }

          dispatch(dispatchedFunction(dispatchedObject));
        })
        .catch(() => {
          toast.error('Не удалось удалить постоянный расход.');
        });
    } catch (err) {
      dispatch(setIsFetchFailed(true));
    }
  } else {
    newCashFlowsList = currentCashFlows.filter((cashFlow) => cashFlow.id !== item.id);

    switch (type) {
      case dictionary.DATA_LIST_TYPE_INCOMES:
        dispatchedObject = {
          currentIncomes: newCashFlowsList,
          currentIncomesSum: getSumByArray(newCashFlowsList),
        };
        break;
      case dictionary.DATA_LIST_TYPE_COSTS:
        dispatchedObject = {
          currentCosts: newCashFlowsList,
          currentCostsSum: getSumByArray(newCashFlowsList),
        };
        break;
      case dictionary.DATA_LIST_TYPE_SPENDINGS:
        dispatchedObject = {
          currentSpendings: newCashFlowsList,
          currentSpendingsSum: getSumByArray(newCashFlowsList),
        };
        break;
      default:
        break;
    }

    dispatch(dispatchedFunction(dispatchedObject));
  }
};

export const editCashFlow = (item, type) => async (dispatch, getState) => {
  let currentCashFlows = [];
  let dispatchedFunction = null;
  let dispatchedObject = {};
  let addRequestURL = '';
  let editRequestURL = '';

  const { currentIncomes, currentCosts, currentSpendings, date } = getState();

  switch (type) {
    case dictionary.DATA_LIST_TYPE_INCOMES:
      currentCashFlows = currentIncomes;
      dispatchedFunction = setIncomes;
      dispatchedObject = {
        currentIncomes: [],
        currentIncomesSum: null,
      };
      addRequestURL = '/api/incomes/';
      editRequestURL = `/api/incomes/${item.id}/`;
      break;
    case dictionary.DATA_LIST_TYPE_COSTS:
      currentCashFlows = currentCosts;
      dispatchedFunction = setCosts;
      dispatchedObject = {
        currentCosts: [],
        currentCostsSum: null,
      };
      addRequestURL = '/api/costs/';
      editRequestURL = `/api/costs/${item.id}/`;
      break;
    case dictionary.DATA_LIST_TYPE_SPENDINGS:
      currentCashFlows = currentSpendings;
      dispatchedFunction = setSpendings;
      dispatchedObject = {
        currentSpending: [],
        currentSpendingSum: null,
      };
      addRequestURL = '/api/spendings/';
      editRequestURL = `/api/spendings/${item.id}/`;
      break;
    default:
      toast.error('Не выбран тип CashFlow-объекта.');
      return false;
  }

  let newCashFlowsList = currentCashFlows.map((cashFlow) => {
    if (cashFlow.id === item.id) {
      return { ...cashFlow, isPending: true };
    }
    return cashFlow;
  });

  switch (type) {
    case dictionary.DATA_LIST_TYPE_INCOMES:
      dispatchedObject = {
        ...dispatchedObject,
        currentIncomes: newCashFlowsList,
      };
      break;
    case dictionary.DATA_LIST_TYPE_COSTS:
      dispatchedObject = {
        ...dispatchedObject,
        currentCosts: newCashFlowsList,
      };
      break;
    case dictionary.DATA_LIST_TYPE_SPENDINGS:
      dispatchedObject = {
        ...dispatchedObject,
        currentSpending: newCashFlowsList,
      };
      break;
    default:
      break;
  }

  dispatch(dispatchedFunction(dispatchedObject));

  try {
    const payload = {
      date: getBeginOfMonth(date),
      category: item.category,
      value: item.value,
    };
    const updatedCashFlow = item.isNew
      ? await fetchData(addRequestURL, 'POST', payload)
      : await fetchData(editRequestURL, 'PUT', payload);

    newCashFlowsList = currentCashFlows.map((cashFlow) => {
      if (cashFlow.id === item.id) {
        return {
          id: updatedCashFlow.id, category: updatedCashFlow.category, value: updatedCashFlow.value,
        };
      }
      return cashFlow;
    });

    switch (type) {
      case dictionary.DATA_LIST_TYPE_INCOMES:
        dispatchedObject = {
          currentIncomes: newCashFlowsList,
          currentIncomesSum: getSumByArray(newCashFlowsList),
        };
        break;
      case dictionary.DATA_LIST_TYPE_COSTS:
        dispatchedObject = {
          currentCosts: newCashFlowsList,
          currentCostsSum: getSumByArray(newCashFlowsList),
        };
        break;
      case dictionary.DATA_LIST_TYPE_SPENDINGS:
        dispatchedObject = {
          currentSpending: newCashFlowsList,
          currentSpendingSum: getSumByArray(newCashFlowsList),
        };
        break;
      default:
        break;
    }

    dispatch(dispatchedFunction(dispatchedObject));
  } catch (err) {
    toast.error('Не удалось изменить постоянные расходы.');
    dispatch(setIsFetchFailed(true));
  }
};

/* Savings */

export const editSavings = (data) => (dispatch) => {
  dispatch(setSavings({ currentSavings: data }));
};

/* Overview */

export const getOverviewData = () => async (dispatch) => {
  await dispatch(fetchSpendings());
  await dispatch(fetchIncomes());
  await dispatch(fetchCosts());
  await dispatch(fetchSavings());
  dispatch(calculateOverviewData());
};
