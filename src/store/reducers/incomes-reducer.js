import Type from '../action-types';

const incomesDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_INCOMES_DATA:
      return action.payload;
    case Type.SET_INCOMES_DATA:
      return {
        ...state,
        incomesCurrentMonthList: action.payload.newList,
        incomesCurrentMonthSum: action.payload.newSum,
      };
    default:
      return state;
  }
};

export default incomesDataReducer;
