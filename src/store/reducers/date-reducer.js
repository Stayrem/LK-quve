import * as moment from 'moment';
import Type from '../action-types';

const dateReducer = (state = null, action) => {
  switch (action.type) {
    case Type.FETCH_DATE_DATA:
      return moment.unix(action.payload).utc();
    case Type.SET_DATE:
      return moment.unix(action.payload).utc();
    default:
      return state;
  }
};

export default dateReducer;
