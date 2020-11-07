import Type from '../action-types';

const costsDataReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FETCH_COSTS_DATA:
      return action.payload;
    case Type.SET_COSTS_DATA:
      return {
        ...state,
        costsCurrentMonthList: action.payload.newList,
        costsCurrentMonthSum: action.payload.newSum,
      };
    default:
      return state;
  }
};

export default costsDataReducer;
