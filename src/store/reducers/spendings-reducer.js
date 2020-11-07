import Type from '../action-types';

const spendingsDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_SPENDINGS_DATA:
      return action.payload;
    case Type.SET_SPENDINGS_DATA:
      return {
        ...state,
        spendingsTodayList: action.payload.newList,
        spendingsTodaySum: action.payload.newSum,
      };
    default:
      return state;
  }
};

export default spendingsDataReducer;
