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
  type: Type.SET_SAVINGS,
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
    dispatch(setMonthSpendings(currentMonthSpendings.data));
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

/* Spendings */

export const addSpending = () => (dispatch, getState) => {
  const { currentMonthSpendings, date } = getState();
  dispatch(setMonthSpendings([...currentMonthSpendings, {
    id: nanoid(),
    name: '',
    value: null,
    date: getBeginOfDay(date),
  }]));
  dispatch(calculateOverviewData());
};

export const deleteSpending = (id) => (dispatch, getState) => {
  const { currentMonthSpendings } = getState();
  const newList = currentMonthSpendings.filter((it) => it.id !== id);
  dispatch(setMonthSpendings(newList));
  dispatch(calculateOverviewData());
};

export const editSpending = (spending) => async (dispatch, getState) => {
  const { currentMonthSpendings } = getState();

  dispatch(setMonthSpendings(currentMonthSpendings.map((it) => {
    if (it.id === spending.id) {
      return { ...it, isPending: true };
    }
    return it;
  })));

  try {
    await fetchData('https://run.mocky.io/v3/f2635207-4c9d-466a-a590-be0a332cf85a?mocky-delay=1500ms');
    dispatch(setMonthSpendings(currentMonthSpendings.map((it) => {
      if (it.id === spending.id) {
        return { ...it, name: spending.name, value: spending.value };
      }
      return it;
    })));
    dispatch(calculateOverviewData());
  } catch (err) {
    toast.error('Не удалось изменить дневные траты.');
    dispatch(setIsFetchFailed(true));
  }
};

/* Incomes */

export const addIncome = () => (dispatch, getState) => {
  const { currentIncomes, date } = getState();
  const newIncomesList = [...currentIncomes, {
    id: nanoid(),
    name: '',
    value: null,
    date: getBeginOfMonth(date),
    isNew: true,
  }];
  const currentIncomesSum = getSumByArray(newIncomesList);
  dispatch(setIncomes({ currentIncomes: newIncomesList, currentIncomesSum }));
};

export const deleteIncome = (item) => (dispatch, getState) => {
  const { currentIncomes } = getState();

  let newIncomesList = currentIncomes.map((it) => {
    if (it.id === item.id) {
      return { ...it, isPending: true };
    }
    return it;
  });

  dispatch(setIncomes({ currentIncomes: newIncomesList }));

  if (!item.isNew) {
    try {
      fetchData(`/api/incomes/${item.id}/`, 'DELETE')
        .then(() => {
          newIncomesList = currentIncomes.filter((it) => it.id !== item.id);
          dispatch(setIncomes({
            currentIncomes: newIncomesList,
            currentIncomesSum: getSumByArray(newIncomesList),
          }));
        })
        .catch(() => {
          toast.error('Не удалось удалить доход.');
        });
    } catch (err) {
      dispatch(setIsFetchFailed(true));
    }
  } else {
    newIncomesList = currentIncomes.filter((it) => it.id !== item.id);
    dispatch(setIncomes({
      currentIncomes: newIncomesList,
      currentIncomesSum: getSumByArray(newIncomesList),
    }));
  }
};

export const editIncome = (incomeItem) => async (dispatch, getState) => {
  const { currentIncomes, date } = getState();
  let newIncomesList = currentIncomes.map((it) => {
    if (it.id === incomeItem.id) {
      return { ...it, isPending: true };
    }
    return it;
  });

  dispatch(setIncomes({ currentIncomes: newIncomesList }));

  try {
    const payload = {
      date: getBeginOfMonth(date),
      category: incomeItem.category,
      value: incomeItem.value,
    };
    const updatedIncome = incomeItem.isNew
      ? await fetchData('/api/incomes/', 'POST', payload)
      : await fetchData(`/api/incomes/${incomeItem.id}/`, 'PUT', payload);

    newIncomesList = currentIncomes.map((it) => {
      if (it.id === incomeItem.id) {
        return {
          id: updatedIncome.id, category: incomeItem.category, value: incomeItem.value,
        };
      }
      return it;
    });

    dispatch(setIncomes({
      currentIncomes: newIncomesList,
      currentIncomesSum: getSumByArray(newIncomesList),
    }));
  } catch (err) {
    toast.error('Не удалось изменить доходы.');
    dispatch(setIsFetchFailed(true));
  }
};

/* Costs */

export const addCost = () => (dispatch, getState) => {
  const { currentCosts, date } = getState();
  const newCostsList = [...currentCosts, {
    id: nanoid(),
    name: '',
    value: null,
    status: true,
    date: getBeginOfMonth(date),
    isNew: true,
  }];
  const currentCostsSum = getSumByArray(newCostsList);
  dispatch(setCosts({ currentCosts: newCostsList, currentCostsSum }));
};

export const deleteCost = (item) => (dispatch, getState) => {
  const { currentCosts } = getState();

  let newCostsList = currentCosts.map((it) => {
    if (it.id === item.id) {
      return { ...it, isPending: true };
    }
    return it;
  });

  dispatch(setCosts({ currentCosts: newCostsList }));

  if (!item.isNew) {
    try {
      fetchData(`/api/costs/${item.id}/`, 'DELETE')
        .then(() => {
          newCostsList = currentCosts.filter((it) => it.id !== item.id);
          dispatch(setCosts({
            currentCosts: newCostsList,
            currentCostsSum: getSumByArray(newCostsList),
          }));
        })
        .catch(() => {
          toast.error('Не удалось удалить постоянный расход.');
        });
    } catch (err) {
      dispatch(setIsFetchFailed(true));
    }
  } else {
    newCostsList = currentCosts.filter((it) => it.id !== item.id);
    dispatch(setCosts({
      currentCosts: newCostsList,
      currentCostsSum: getSumByArray(newCostsList),
    }));
  }
};

export const editCost = (costItem) => async (dispatch, getState) => {
  const { currentCosts, date } = getState();

  let newCostsList = currentCosts.map((it) => {
    if (it.id === costItem.id) {
      return { ...it, isPending: true };
    }
    return it;
  });

  dispatch(setCosts({ currentCosts: newCostsList }));

  try {
    const payload = {
      date: getBeginOfMonth(date),
      category: costItem.category,
      value: costItem.value,
    };
    const updatedCost = costItem.isNew
      ? await fetchData('/api/costs/', 'POST', payload)
      : await fetchData(`/api/costs/${costItem.id}/`, 'PUT', payload);

    newCostsList = currentCosts.map((it) => {
      if (it.id === costItem.id) {
        return {
          id: updatedCost.id, category: costItem.category, value: costItem.value,
        };
      }
      return it;
    });

    dispatch(setCosts({
      currentCosts: newCostsList,
      currentCostsSum: getSumByArray(newCostsList),
    }));
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

const calculateOverviewData = () => async (dispatch, getState) => {
  const {
    currentIncomesSum,
    currentCostsSum,
    currentSavings,
    currentMonthSpendings,
    date,
  } = getState();

  const currentSavingsSum = getAbsFromValue(currentSavings.value, currentSavings.type, currentIncomesSum);
  const currentMonthSpendingsSum = currentMonthSpendings
    .reduce((acc, current) => acc + current.value, 0);
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

export const getOverviewData = () => async (dispatch) => {
  await dispatch(fetchSpendings());
  await dispatch(fetchIncomes());
  await dispatch(fetchCosts());
  await dispatch(fetchSavings());
  dispatch(calculateOverviewData());
};
