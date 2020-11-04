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

export const setSavingSum = (data) => ({
  type: Type.SET_SAVING_SUM,
  payload: data,
});

export const setSpendingsData = (data) => ({
  type: Type.SET_SPENDINGS_DATA,
  payload: data,
});

export const setTotalIncomesData = (data) => ({
  type: Type.SET_TOTAL_INCOMES_DATA,
  payload: data,
});

export const setTotalCostsData = (data) => ({
  type: Type.SET_TOTAL_COSTS_DATA,
  payload: data,
});

export const setTotalDate = (data) => ({
  type: Type.SET_TOTAL_DATE,
  payload: data,
});

export const getDefaultData = () => async (dispatch) => {
  try {
    const overviewData = await fetchData('/mocks/overview/get.json');
    const saldoData = await fetchData('/mocks/overview/saldo.json');
    const { savingsSum, incomesSum, savingsPercent } = overviewData.data;
    const savingSum = savingsSum === null ? (incomesSum * savingsPercent) / 100 : savingsSum;
    dispatch(setOverviewData({ ...overviewData.data, savingSum }));
    dispatch(setSaldoData(saldoData.data));
    dispatch(setSpendingsData(overviewData.data.spendingsTodayList));
  } catch (err) {
    console.log(err);
  }
};

export const getTotalIncomes = () => async (dispatch) => {
  try {
    const totals = await fetchData('/mocks/incomes/get.json');
    dispatch(setTotalIncomesData(totals.data.incomesList));
    dispatch(setTotalDate(totals.data.date));
  } catch (err) {
    console.log(err);
  }
};
