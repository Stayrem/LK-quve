import { nanoid } from 'nanoid';
import moment from 'moment';
import 'moment/locale/ru';
import {
  getAbsFromValue,
  getBeginOfDay, getBeginOfMonth, getSumByArray,
} from '@utils/functions';
import { toast } from 'react-toastify';
import Type from './action-types';
import fetchData from '../utils/fetch';
import dictionary from '@utils/dictionary';

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

export const setMonthSpendings = (data) => ({
  type: Type.SET_MONTH_SPENDINGS_DATA,
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
  const currentMonth = getBeginOfMonth(date);

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
  const currentMonth = getBeginOfMonth(date);

  try {
    const currentCosts = await fetchData(`/api/costs/?date=${currentMonth}`, 'GET');
    const currentCostsSum = currentCosts.length > 0 ? getSumByArray(currentCosts) : 0;
    dispatch(setCosts({ currentCosts, currentCostsSum }));
  } catch (error) {
    toast.error('Не удалось загрузить постоянные расходы.');
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchSpendings = () => async (dispatch) => {
  try {
    const currentMonthSpendings = await fetchData('/mocks/spendings/get.json');
    dispatch(setMonthSpendings({ currentMonthSpendings }));
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
    currentMonthSpendings,
    date,
  } = getState();

  const currentSavingsSum = getAbsFromValue(currentSavings.value, currentSavings.type, currentIncomesSum);
  const currentMonthSpendingsSum = currentMonthSpendings.length > 0
    ? currentMonthSpendings.reduce((acc, current) => acc + current.value, 0)
    : 0;
  const currentDaySpendings = currentMonthSpendings.filter((item) => {
    const selectedDay = getBeginOfDay(date);
    const storedDay = item.date;
    return selectedDay === storedDay;
  });
  const currentDaySpendingsSum = currentDaySpendings.length > 0
    ? currentDaySpendings.reduce((acc, current) => acc + current.value, 0)
    : 0;

  const currentProfit = currentIncomesSum - currentCostsSum - currentSavingsSum;
  const currentFixedBudget = currentProfit / moment(date * 1000).daysInMonth();
  const currentDailyBudget = Math.round(currentFixedBudget * moment(date * 1000).utc().date() - currentMonthSpendingsSum + currentDaySpendingsSum);

  const currentRestValue = currentProfit - currentMonthSpendingsSum + currentDaySpendingsSum;
  const currentRestPercent = currentRestValue > 0
    ? Math.round((currentRestValue / currentIncomesSum) * 100)
    : 0;

  dispatch(setOverviewData({
    currentDailyBudget,
    currentSavingsSum,
    currentRestValue,
    currentRestPercent,
    currentDaySpendings,
    currentDaySpendingsSum,
  }));
};

/* Spendings */

export const addSpending = () => (dispatch, getState) => {
  const { currentMonthSpendings, date } = getState();
  const newCurrentMonthSpendings = [...currentMonthSpendings, {
    id: nanoid(),
    name: '',
    value: null,
    date: getBeginOfDay(date),
    isNew: true,
  }];

  dispatch(setMonthSpendings({ currentMonthSpendings: newCurrentMonthSpendings }));
  dispatch(calculateOverviewData());
};

export const deleteSpending = (item) => (dispatch, getState) => {
  const { currentMonthSpendings } = getState();

  let newCurrentMonthSpendings = currentMonthSpendings.map((it) => {
    if (it.id === item.id) {
      return { ...it, isPending: true };
    }
    return it;
  });

  dispatch(setMonthSpendings({ currentMonthSpendings: newCurrentMonthSpendings }));

  if (!item.isNew) {
    try {
      fetchData(`/api/spendings/${item.id}/`, 'DELETE')
        .then(() => {
          newCurrentMonthSpendings = currentMonthSpendings.filter((it) => it.id !== item.id);
          dispatch(setMonthSpendings({ currentMonthSpendings: newCurrentMonthSpendings }));
          dispatch(calculateOverviewData());
        })
        .catch(() => {
          toast.error('Не удалось удалить дневные траты.');
        });
    } catch (err) {
      dispatch(setIsFetchFailed(true));
    }
  } else {
    newCurrentMonthSpendings = currentMonthSpendings.filter((it) => it.id !== item.id);
    dispatch(setMonthSpendings({ currentMonthSpendings: newCurrentMonthSpendings }));
    dispatch(calculateOverviewData());
  }
};

export const editSpending = (spending) => async (dispatch, getState) => {
  const { currentMonthSpendings, date } = getState();

  let newCurrentMonthSpendings = currentMonthSpendings.map((it) => {
    if (it.id === spending.id) {
      return { ...it, isPending: true };
    }
    return it;
  });

  dispatch(setMonthSpendings({ currentMonthSpendings: newCurrentMonthSpendings }));

  try {
    const payload = {
      date: getBeginOfMonth(date),
      category: spending.category,
      value: spending.value,
    };
    const updatedSpending = spending.isNew
      ? await fetchData('/api/spendings/', 'POST', payload)
      : await fetchData(`/api/spendings/${spending.id}/`, 'PUT', payload);

    newCurrentMonthSpendings = currentMonthSpendings.map((it) => {
      if (it.id === spending.id) {
        return {
          id: updatedSpending.id, category: updatedSpending.category, value: updatedSpending.value,
        };
      }
      return it;
    });

    dispatch(setMonthSpendings({ currentMonthSpendings: newCurrentMonthSpendings }));
  } catch (err) {
    toast.error('Не удалось изменить дневные траты.');
    dispatch(setIsFetchFailed(true));
  }
};

/* CashFlows */

export const addCashFlow = (type) => (dispatch, getState) => {
  let currentCashFlows = [];
  let dispatchedFunction = null;
  let dispatchedObject = {};

  const { currentIncomes, currentCosts, date } = getState();

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

  const { currentIncomes, currentCosts } = getState();

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

  const { currentIncomes, currentCosts, date } = getState();

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
