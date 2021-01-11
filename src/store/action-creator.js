import { nanoid } from 'nanoid';
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

export const setIncomes = (obj) => ({
  type: Type.SET_INCOMES_DATA,
  payload: obj,
});

export const setCosts = (data) => ({
  type: Type.SET_COSTS_DATA,
  payload: data,
});

export const setMounthSpendings = (data) => ({
  type: Type.SET_MOUNTH_SPENDINGS_DATA,
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

export const fetchUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await fetchData('/mocks/info.json');
    dispatch(setUserInfo(userInfo.data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchIncomes = () => async (dispatch) => {
  const incomes = await fetchData('/mocks/incomes/get.json');
  const incomesSum = calculateSum(incomes.data);
  dispatch(setIncomes({ incomes: incomes.data, incomesSum }));
};

export const fetchCosts = () => async (dispatch) => {
  const costs = await fetchData('/mocks/costs/get.json');
  const costsSum = calculateSum(costs.data);
  dispatch(setCosts({ costs: costs.data, costsSum }));
};

export const fetchSpendings = () => async (dispatch) => {
  const spendings = await fetchData('/mocks/spendings/get.json');
  dispatch(setMounthSpendings(spendings.data));
};

export const fetchSavings = () => async (dispatch) => {
  const savings = await fetchData('/mocks/savings/get.json');
  dispatch(setSavings(savings.data));
};

const calculateOverviewData = () => async (dispatch, getState) => {
  const {
    savings,
    incomes,
    mounthSpendings,
    incomesSum,
    date,
  } = getState();
  const currentSavingSum = (savings[savings.length - 1]
    .percent * incomes.reduce((acc, current) => acc + current.value, 0)) / 100;
  const mounthSpendingsSum = mounthSpendings.reduce((acc, current) => acc + current.value, 0);
  /*
    const selectedDaySpendings = mounthSpendings.filter((item) => {
    const selectedDay = moment(date * 1000).format('YYYY-MM-DD');
    const storedDay = moment(item.date * 1000).format('YYYY-MM-DD');
    return selectedDay === storedDay;
  });
  */
  const selectedDaySpendings = mounthSpendings;
  const daySpendingsSum = selectedDaySpendings.reduce((acc, current) => acc + current.value, 0);
  const moneyRemains = incomesSum - mounthSpendingsSum - currentSavingSum;

  dispatch(setOverviewData({
    currentSavingSum,
    incomesSum,
    mounthSpendingsSum,
    daySpendingsSum,
    selectedDaySpendings,
    moneyRemains,
  }));
};

export const addSpending = () => (dispatch, getState) => {
  const { mounthSpendings } = getState();
  dispatch(setMounthSpendings([...mounthSpendings, { id: nanoid(), name: '', value: 0 }]));
  dispatch(calculateOverviewData());
};

export const deleteSpending = (id) => (dispatch, getState) => {
  const { mounthSpendings } = getState();
  const newList = mounthSpendings.filter((it) => it.id !== id);
  dispatch(setMounthSpendings(newList));
  dispatch(calculateOverviewData());
};

export const editSpending = (spending) => (dispatch, getState) => {
  const { mounthSpendings } = getState();
  dispatch(setMounthSpendings(mounthSpendings.map((it) => {
    if (it.id === spending.id) {
      return { ...it, name: spending.name, value: spending.value };
    }
    return it;
  })));
  dispatch(calculateOverviewData());
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
