import axios from 'axios';
import store from '../store/store';
import { resetStore, setUserAccessToken } from '../store/action-creator';

const updateToken = async () => {
  const accessToken = await axios.post('/api/auth/refresh/');

  return accessToken.data.access;
};

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('USER_ACCESS_TOKEN') || null;

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
}, (error) => Promise.reject(error));

axios.interceptors.response.use(null, (error) => {
  if (error.config && error.response && error.response.status === 401) {
    return updateToken()
      .then((token) => {
        localStorage.setItem('USER_ACCESS_TOKEN', token);
        store.dispatch(setUserAccessToken(token));

        return axios.request(error.config);
      })
      .catch((err) => {
        if (err.response.status >= 400) {
          store.dispatch(resetStore());
        }
        Promise.reject(error);
      });
  }
  return Promise.reject(error);
});

export default async (url, method = 'GET', payload = {}) => {
  switch (method) {
    case 'POST': {
      const response = await axios.post(url, payload);
      return response.data;
    }
    case 'PUT': {
      const response = await axios.put(url, payload);
      return response.data;
    }
    case 'DELETE': {
      const response = await axios.delete(url);
      return response.data;
    }
    default: {
      const response = await axios.get(url);
      return response.data;
    }
  }
};
