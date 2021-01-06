import dictionary from '../utils/dictionary';
import Type from './action-types';
import fetchData from '../utils/fetch';

export const fetchDateData = (data) => ({
  type: Type.FETCH_DATE_DATA,
  payload: data,
});

export const fetchIncomesData = (data) => ({
  type: Type.FETCH_INCOMES_DATA,
  payload: data,
});

export const fetchCostsData = (data) => ({
  type: Type.FETCH_COSTS_DATA,
  payload: data,
});

export const fetchSavingsData = (data) => ({
  type: Type.FETCH_SAVINGS_DATA,
  payload: data,
});

export const fetchSpendingsData = (data) => ({
  type: Type.FETCH_SPENDINGS_DATA,
  payload: data,
});

export const fetchSpendingsHistoryData = (data) => ({
  type: Type.FETCH_SPENDINGS_HISTORY_DATA,
  payload: data,
});

export const fetchSaldoHistoryData = (data) => ({
  type: Type.FETCH_SALDO_HISTORY_DATA,
  payload: data,
});

export const fetchSavingsHistoryData = (data) => ({
  type: Type.FETCH_SAVINGS_HISTORY_DATA,
  payload: data,
});

export const setDate = (data) => ({
  type: Type.SET_DATE,
  payload: data,
});

export const setIncomesData = (data) => ({
  type: Type.SET_INCOMES_DATA,
  payload: data,
});

export const setCostsData = (data) => ({
  type: Type.SET_COSTS_DATA,
  payload: data,
});

export const setSpendingsData = (data) => ({
  type: Type.SET_SPENDINGS_DATA,
  payload: data,
});

export const setSavingsData = (data) => ({
  type: Type.SET_SAVINGS_DATA,
  payload: data,
});

export const getDateData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/date/get.json');
    dispatch(fetchDateData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getIncomesData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/incomes/get.json');
    dispatch(fetchIncomesData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getCostsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/costs/get.json');
    dispatch(fetchCostsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getSavingsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/savings/get.json');
    dispatch(fetchSavingsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getSpendingsData = () => async (dispatch) => {
  try {
    const data = await fetchData('/mocks/spendings/get.json');
    dispatch(fetchSpendingsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const getHistoryData = (type) => async (dispatch) => {
  let url;
  let dispatchFunction;

  switch (type) {
    case dictionary.HISTORY_TYPE_SPENDINGS:
      url = '/mocks/history/spendings.json';
      dispatchFunction = (data) => fetchSpendingsHistoryData(data);
      break;
    case dictionary.HISTORY_TYPE_SALDO:
      url = '/mocks/history/saldo.json';
      dispatchFunction = (data) => fetchSaldoHistoryData(data);
      break;
    case dictionary.HISTORY_TYPE_SAVINGS:
      url = '/mocks/history/savings.json';
      dispatchFunction = (data) => fetchSavingsHistoryData(data);
      break;
    default:
      break;
  }

  try {
    const data = await fetchData(url);
    dispatch(dispatchFunction(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateSpendingsData = (data) => async (dispatch) => {
  try {
    dispatch(setSpendingsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateIncomesData = (data) => async (dispatch) => {
  try {
    dispatch(setIncomesData(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateCostsData = (data) => async (dispatch) => {
  try {
    dispatch(setCostsData(data));
  } catch (err) {
    console.log(err);
  }
};

export const updateSavingsData = (data) => async (dispatch) => {
  try {
    dispatch(setSavingsData(data));
  } catch (err) {
    console.log(err);
  }
};
