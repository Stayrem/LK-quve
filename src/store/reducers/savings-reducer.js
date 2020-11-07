import Type from '../action-types';

const savingsDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_SAVINGS_DATA:
      return action.payload;
    case Type.SET_SAVINGS_DATA:
      return {
        ...state,
        savingsCurrentMonthSum: action.payload,
      };
    default:
      return state;
  }
};

export default savingsDataReducer;
