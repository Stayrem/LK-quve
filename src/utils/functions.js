import moment from 'moment';
import { toast } from 'react-toastify';
import { setIsFetchFailed, setUserTokenActuality } from '../store/action-creator';

export const getSumByArray = (list) => list.reduce((acc, current) => {
  return acc + current.value;
}, 0);

export const getFormatedNumber = (number) => number
  .toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ');

export const getBeginOfDay = (date) => moment(date * 1000).utc().startOf('day').unix();

export const getBeginOfMonth = (date) => moment(date * 1000).utc().startOf('month').unix();

export const getAuthorizationHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const handleError = (dispatch, error) => {
  const { response } = error;

  switch (response.status) {
    case 401:
      dispatch(setUserTokenActuality(false));
      toast.error('Сессия истекла, пожалуйста, авторизуйтесь заново.');
      break;
    default:
      break;
  }

  dispatch(setIsFetchFailed(true));
};
