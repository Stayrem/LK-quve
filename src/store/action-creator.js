import { nanoid } from 'nanoid';
import moment from 'moment';
import 'moment/locale/ru';
import { getBeginOfDay, getBeginOfMonth } from '@utils/functions';
import Type from './action-types';
import fetchData from '../utils/fetch';

const calculateSum = (list) => list.reduce((acc, current) => {
  if (current.status) {
    return acc + current.value;
  }
  return acc + 0;
}, 0);

export const setUserInfo = (data) => ({
  type: Type.SET_USER_INFO,
  payload: data,
});

export const resetStore = () => ({
  type: Type.RESET_STORE,
});

export const setIncomes = (obj) => ({
  type: Type.SET_INCOMES_DATA,
  payload: obj,
});

export const setCosts = (data) => ({
  type: Type.SET_COSTS_DATA,
  payload: data,
});

export const setMonthSpendings = (data) => ({
  type: Type.SET_MONTH_SPENDINGS_DATA,
  payload: data,
});

export const setSavings = (data) => ({
  type: Type.SET_SAVINGS,
  payload: data,
});

export const setOverviewData = (obj) => ({
  type: Type.SET_OVERVIEW_DATA,
  payload: obj,
});

export const setDate = (epoch) => ({
  type: Type.SET_DATE,
  payload: epoch,
});

export const setIsFetchFailed = (bool) => ({
  type: Type.SET_IS_FETCH_FAILED,
  payload: bool,
});

export const fetchUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await fetchData('/mocks/info.json');
    dispatch(setUserInfo(userInfo.data));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchIncomes = () => async (dispatch) => {
  try {
    const currentIncomes = await fetchData('/mocks/incomes/get.json');
    const currentIncomesSum = calculateSum(currentIncomes.data);
    dispatch(setIncomes({ currentIncomes: currentIncomes.data, currentIncomesSum }));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchCosts = () => async (dispatch) => {
  const currentCosts = await fetchData('/mocks/costs/get.json');
  const currentCostsSum = calculateSum(currentCosts.data);
  dispatch(setCosts({ currentCosts: currentCosts.data, currentCostsSum }));
};

export const fetchSpendings = () => async (dispatch) => {
  try {
    const currentMonthSpendings = await fetchData('/mocks/spendings/get.json');
    dispatch(setMonthSpendings(currentMonthSpendings.data));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchSavings = () => async (dispatch, getState) => {
  const { date } = getState();
  try {
    const currentYearSavings = await fetchData('/mocks/savings/get.json');
    const currentSavings = currentYearSavings.data.find((item) => {
      const selectedMonth = getBeginOfMonth(date);
      const storedMonth = item.date;
      return selectedMonth === storedMonth;
    });
    dispatch(setSavings({ currentYearSavings: currentYearSavings.data, currentSavings }));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

const calculateOverviewData = () => async (dispatch, getState) => {
  const {
    currentIncomesSum,
    currentCostsSum,
    currentSavings,
    currentMonthSpendings,
    date,
  } = getState();

  /*
  * Высчитываются данные для сводки для выбранного в календаре дня.
  * */

  const currentSavingsSum = (currentSavings.percent * currentIncomesSum) / 100;
  const currentMonthSpendingsSum = currentMonthSpendings.reduce((acc, current) => acc + current.value, 0);
  const currentDaySpendings = currentMonthSpendings.filter((item) => {
    const selectedDay = getBeginOfDay(date);
    const storedDay = item.date;
    return selectedDay === storedDay;
  });
  const currentDaySpendingsSum = currentDaySpendings.length > 0
    ? currentDaySpendings.reduce((acc, current) => acc + current.value, 0)
    : 0;

  const currentProfit = currentIncomesSum - currentCostsSum - currentSavingsSum;
  const currentFixedBudget = currentProfit / moment(date).daysInMonth();
  const currentDailyBudget = Math.round(currentFixedBudget * moment(date * 1000).utc().date() - currentMonthSpendingsSum + currentDaySpendingsSum);

  const currentRestValue = currentProfit - currentMonthSpendingsSum + currentDaySpendingsSum;
  const currentRestPercent = Math.round((currentRestValue / currentIncomesSum) * 100);

  dispatch(setOverviewData({
    currentDailyBudget,
    currentSavingsSum,
    currentRestValue,
    currentRestPercent,
    currentDaySpendings,
    currentDaySpendingsSum,
  }));
};

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
  dispatch(calculateOverviewData());
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
    dispatch(setIsFetchFailed(true));
  }
};

export const editSavingsData = (data) => (dispatch, getState) => {
  const { currentYearSavings, date } = getState();
  const targetDate = data.date;
  const updatedSavings = currentYearSavings.map((item) => {
    const selectedMonth = getBeginOfMonth(targetDate);
    const storedMonth = item.date;
    if (selectedMonth === storedMonth) {
      return data;
    }
    return item;
  });
  const currentSavings = updatedSavings.find((item) => {
    const selectedMonth = getBeginOfMonth(date);
    const storedMonth = item.date;
    return selectedMonth === storedMonth;
  });
  dispatch(setSavings({ currentYearSavings: updatedSavings, currentSavings }));
};

export const addIncome = () => (dispatch, getState) => {
  const { currentIncomes, date } = getState();
  const newIncomesList = [...currentIncomes, {
    id: nanoid(),
    name: '',
    value: null,
    status: true,
    date: getBeginOfMonth(date),
  }];
  const currentIncomesSum = calculateSum(newIncomesList);
  dispatch(setIncomes({ currentIncomes: newIncomesList, currentIncomesSum }));
};

export const deleteIncome = (id) => (dispatch, getState) => {
  const { currentIncomes } = getState();
  const newIncomesList = currentIncomes.filter((it) => it.id !== id);
  const currentIncomesSum = calculateSum(newIncomesList);
  dispatch(setIncomes({ currentIncomes: newIncomesList, currentIncomesSum }));
};

export const editIncome = (incomeItem) => (dispatch, getState) => {
  const { currentIncomes } = getState();
  const newIncomesList = currentIncomes.map((it) => {
    if (it.id === incomeItem.id) {
      return {
        ...it,
        name: incomeItem.name,
        value: incomeItem.value,
        status: incomeItem.status,
      };
    }
    return it;
  });
  const currentIncomesSum = calculateSum(newIncomesList);
  dispatch(setIncomes({ currentIncomes: newIncomesList, currentIncomesSum }));
};

export const addCost = () => (dispatch, getState) => {
  const { currentCosts, date } = getState();
  const newCostsList = [...currentCosts, {
    id: nanoid(),
    name: '',
    value: null,
    status: true,
    date: getBeginOfMonth(date),
  }];
  const currentCostsSum = calculateSum(newCostsList);
  dispatch(setCosts({ currentCosts: newCostsList, currentCostsSum }));
};

export const deleteCost = (id) => (dispatch, getState) => {
  const { currentCosts } = getState();
  const newCostsList = currentCosts.filter((it) => it.id !== id);
  const currentCostsSum = calculateSum(newCostsList);
  dispatch(setCosts({ currentCosts: newCostsList, currentCostsSum }));
};

export const editCost = (costItem) => (dispatch, getState) => {
  const { currentCosts } = getState();
  const newCostsList = currentCosts.map((it) => {
    if (it.id === costItem.id) {
      return {
        ...it,
        name: costItem.name,
        value: costItem.value,
        status: costItem.status,
      };
    }
    return it;
  });
  const currentCostsSum = calculateSum(newCostsList);
  dispatch(setCosts({ currentCosts: newCostsList, currentCostsSum }));
};

export const getOverviewData = () => async (dispatch) => {
  await dispatch(fetchSpendings());
  await dispatch(fetchIncomes());
  await dispatch(fetchCosts());
  await dispatch(fetchSavings());
  dispatch(calculateOverviewData());
};
