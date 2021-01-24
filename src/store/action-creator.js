import { nanoid } from 'nanoid';
import moment from 'moment';
import 'moment/locale/ru';
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
  type: Type.SET_Month_SPENDINGS_DATA,
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
    const incomes = await fetchData('/mocks/incomes/get.json');
    const incomesSum = calculateSum(incomes.data);
    dispatch(setIncomes({ incomes: incomes.data, incomesSum }));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchCosts = () => async (dispatch) => {
  const costs = await fetchData('/mocks/costs/get.json');
  const costsSum = calculateSum(costs.data);
  dispatch(setCosts({ costs: costs.data, costsSum }));
};

export const fetchSpendings = () => async (dispatch) => {
  try {
    const spendings = await fetchData('/mocks/spendings/get.json');
    dispatch(setMonthSpendings(spendings.data));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

export const fetchSavings = () => async (dispatch, getState) => {
  const { date } = getState();
  try {
    const savings = await fetchData('/mocks/savings/get.json');
    const savingsSelectedMonth = savings.data.find((item) => {
      const selectedMonth = moment(date).format('YYYY-MM');
      const storedMonth = moment(item.date).format('YYYY-MM');
      return selectedMonth === storedMonth;
    });
    dispatch(setSavings({ savings: savings.data, savingsSelectedMonth }));
  } catch (err) {
    dispatch(setIsFetchFailed(true));
  }
};

export const updateSavingsData = (data) => (dispatch, getState) => {
  const { savings, date } = getState();
  const targetDate = data.date;
  const updatedSavings = savings.map((item) => {
    const selectedMonth = moment(targetDate).format('YYYY-MM');
    const storedMonth = moment(item.date).format('YYYY-MM');
    if (selectedMonth === storedMonth) {
      return data;
    }
    return item;
  });
  const savingsSelectedMonth = updatedSavings.find((item) => {
    const selectedMonth = moment(date).format('YYYY-MM');
    const storedMonth = moment(item.date).format('YYYY-MM');
    return selectedMonth === storedMonth;
  });
  dispatch(setSavings({ savings: updatedSavings, savingsSelectedMonth }));
};

const calculateOverviewData = () => async (dispatch, getState) => {
  const {
    savings,
    incomes,
    monthSpendings,
    incomesSum,
  //  date,
  } = getState();
  const currentSavingSum = (savings[savings.length - 1]
    .percent * incomes.reduce((acc, current) => acc + current.value, 0)) / 100;
  const monthSpendingsSum = monthSpendings.reduce((acc, current) => acc + current.value, 0);
  /*
    const selectedDaySpendings = monthSpendings.find((item) => {
    const selectedDay = moment(date).format('YYYY-MM-DD');
    const storedDay = moment(item.date).format('YYYY-MM-DD');
    return selectedDay === storedDay;
  });
  */
  const selectedDaySpendings = monthSpendings;
  const daySpendingsSum = selectedDaySpendings.reduce((acc, current) => acc + current.value, 0);
  const moneyRemains = incomesSum - monthSpendingsSum - currentSavingSum;

  dispatch(setOverviewData({
    currentSavingSum,
    incomesSum,
    monthSpendingsSum,
    daySpendingsSum,
    selectedDaySpendings,
    moneyRemains,
  }));
};

export const addSpending = () => (dispatch, getState) => {
  const { monthSpendings } = getState();
  dispatch(setMonthSpendings([...monthSpendings, { id: nanoid(), name: '', value: null }]));
  dispatch(calculateOverviewData());
};

export const deleteSpending = (id) => (dispatch, getState) => {
  const { monthSpendings } = getState();
  const newList = monthSpendings.filter((it) => it.id !== id);
  dispatch(setMonthSpendings(newList));
  dispatch(calculateOverviewData());
};

export const editSpending = (spending) => (dispatch, getState) => {
  const { monthSpendings } = getState();
  dispatch(setMonthSpendings(monthSpendings.map((it) => {
    if (it.id === spending.id) {
      return { ...it, isPending: true };
    }
    return it;
  })));
  dispatch(calculateOverviewData());
  try {
    await fetchData('https://run.mocky.io/v3/f2635207-4c9d-466a-a590-be0a332cf85a?mocky-delay=1500ms');
    dispatch(setMonthSpendings(monthSpendings.map((it) => {
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

export const addIncome = () => (dispatch, getState) => {
  const { incomes } = getState();
  const newIncomesList = [...incomes, {
    id: nanoid(), name: '', value: 0, status: true,
  }];
  const incomesSum = calculateSum(newIncomesList);
  dispatch(setIncomes({ incomes: newIncomesList, incomesSum }));
};

export const deleteIncome = (id) => (dispatch, getState) => {
  const { incomes } = getState();
  const newIncomesList = incomes.filter((it) => it.id !== id);
  const incomesSum = calculateSum(newIncomesList);
  dispatch(setIncomes({ incomes: newIncomesList, incomesSum }));
};

export const editIncome = (incomeItem) => (dispatch, getState) => {
  const { incomes } = getState();
  const newIncomesList = incomes.map((it) => {
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
  const incomesSum = calculateSum(newIncomesList);
  dispatch(setIncomes({ incomes: newIncomesList, incomesSum }));
};

export const addCost = () => (dispatch, getState) => {
  const { costs } = getState();
  const newCostsList = [...costs, {
    id: nanoid(), name: '', value: 0, status: true,
  }];
  const costsSum = calculateSum(newCostsList);
  dispatch(setCosts({ costs: newCostsList, costsSum }));
};

export const deleteCost = (id) => (dispatch, getState) => {
  const { costs } = getState();
  const newCostsList = costs.filter((it) => it.id !== id);
  const costsSum = calculateSum(newCostsList);
  dispatch(setCosts({ costs: newCostsList, costsSum }));
};

export const editCost = (costItem) => (dispatch, getState) => {
  const { costs } = getState();
  const newCostsList = costs.map((it) => {
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
  const costsSum = calculateSum(newCostsList);
  dispatch(setIncomes({ costs: newCostsList, costsSum }));
};

export const getOverviewData = () => async (dispatch) => {
  await dispatch(fetchSpendings());
  await dispatch(fetchIncomes());
  await dispatch(fetchCosts());
  await dispatch(fetchSavings());
  dispatch(calculateOverviewData());
};
