import Type from './action-types';
import fetchData from '../utils/fetch';

export const setOverviewData = (data) => ({
  type: Type.FETCH_OVERVIEW_DATA,
  payload: data,
});

export const setSaldoData = (data) => ({
  type: Type.FETCH_SALDO_DATA,
  payload: data,
});

export const setIncomesData = (data) => ({
  type: Type.FETCH_INCOMES_DATA,
  payload: data,
});

export const setCostsData = (data) => ({
  type: Type.FETCH_COSTS_DATA,
  payload: data,
});

export const setSavingsData = (data) => ({
  type: Type.FETCH_SAVINGS_DATA,
  payload: data,
});

export const setDate = (data) => ({
  type: Type.SET_DATE,
  payload: data,
});

export const getDefaultData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/overview/get.json');
    const saldoData = await fetchData('/mocks/overview/saldo.json');
    dispatch(setDate(data.date));
    dispatch(setOverviewData(data));
    dispatch(setSaldoData(saldoData));
  } catch (err) {
    console.log(err);
  }
};

export const getCostsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/incomes/get.json');
    dispatch(setDate(data.date));
    dispatch(setCostsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getIncomesData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/incomes/get.json');
    dispatch(setDate(data.date));
    dispatch(setIncomesData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getSavingsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/savings/get.json');
    dispatch(setDate(data.date));
    dispatch(setSavingsData(data));
  } catch (err) {
    console.log(err);
  }
};
