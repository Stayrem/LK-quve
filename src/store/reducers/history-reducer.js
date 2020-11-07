import Type from '../action-types';

const historyDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_SPENDINGS_HISTORY_DATA:
      return {
        ...state,
        spendingsPreviousDaysList: action.payload.spendingsPreviousDaysList,
        spendingsPreviousDaysSum: action.payload.spendingsPreviousDaysSum,
      };
    case Type.FETCH_SAVINGS_HISTORY_DATA:
      return {
        ...state,
        savingsCurrentYearList: action.payload.savingsCurrentYearList,
        savingsCurrentYearSum: action.payload.savingsCurrentYearSum,
      };
    default:
      return state;
  }
};

export default historyDataReducer;
