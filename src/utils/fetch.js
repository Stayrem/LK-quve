import axios from 'axios';
import store from '../store/store';
import envConfig from './config';
import { resetStore, setUserAccessToken } from '../store/action-creator';
import { sendAmplitudeEvent } from './amplitude';

const updateToken = async () => {
  const accessToken = await axios.post('/api/auth/refresh/');

  return accessToken.data.access;
};

axios.interceptors.request.use((config) => {
  if (![`${envConfig.url.API}/api/auth/sign-in/`, `${envConfig.url.API}/api/auth/sign-up/`].includes(config.url)) {
    const accessToken = localStorage.getItem('USER_ACCESS_TOKEN') || null;

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use(null, (error) => {
  if (error.config && ![`${envConfig.url.API}/api/auth/sign-in/`, `${envConfig.url.API}/api/auth/sign-up/`].includes(error.config.url) && error.response && error.response.status === 401) {
    return updateToken()
      .then((token) => {
        localStorage.setItem('USER_ACCESS_TOKEN', token);
        store.dispatch(setUserAccessToken(token));

        sendAmplitudeEvent('session started');

        return axios.request(error.config);
      })
      .catch((err) => {
        if (err.response.status >= 400) {
          localStorage.removeItem('USER_ACCESS_TOKEN');
          store.dispatch(resetStore());
        }
        Promise.reject(error);
      });
  }
  return Promise.reject(error);
});

export default async (path, method = 'GET', payload = {}) => {
  const url = [envConfig.url.API, path].join('');

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
