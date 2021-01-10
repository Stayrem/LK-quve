import moment from 'moment';
import 'moment/locale/ru';
import { nanoid } from 'nanoid';
import Type from './action-types';
import fetchData from '../utils/fetch';

export const setUserInfo = (data) => ({
  type: Type.SET_USER_INFO,
  payload: data,
});

export const setIncomes = (data) => ({
  type: Type.SET_INCOMES_DATA,
  payload: data,
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
  dispatch(setIncomes(incomes.data));
};

export const fetchCosts = () => async (dispatch) => {
  const costs = await fetchData('/mocks/costs/get.json');
  dispatch(setCosts(costs.data));
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
    date,
  } = getState();
  const currentSavingSum = (savings[savings.length - 1]
    .percent * incomes.reduce((acc, current) => acc + current.value, 0)) / 100;
  const incomesSum = incomes.reduce((acc, current) => acc + current.value, 0);
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

export const getOverviewData = () => async (dispatch) => {
  await dispatch(fetchSpendings());
  await dispatch(fetchIncomes());
  await dispatch(fetchCosts());
  await dispatch(fetchSavings());
  dispatch(calculateOverviewData());
};
