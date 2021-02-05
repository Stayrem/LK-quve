import React, {
  useContext, createContext,
} from 'react';
import fetchData from '@utils/fetch';
import { useDispatch } from 'react-redux';
import { resetStore, setUserAccessToken } from '../store/action-creator';

const mainAuth = {
  async signIn(values, callback) {
    const response = await fetchData('/api/auth/sign-in/', 'POST', values);
    callback(response.access);
  },
  async signUp(values) {
    await fetchData('/api/auth/sign-up/', 'POST', values);
  },
  signOut(callback) {
    callback();
  },
};

const authContext = createContext();

function useProvideAuth() {
  const dispatch = useDispatch();
  const existingAccessToken = localStorage.getItem('USER_ACCESS_TOKEN') || null;

  if (existingAccessToken) {
    dispatch(setUserAccessToken(existingAccessToken));
  }

  const signIn = (values) => mainAuth.signIn(values, (token) => {
    dispatch(setUserAccessToken(token));
    localStorage.setItem('USER_ACCESS_TOKEN', token);
  });

  const signUp = (values) => mainAuth.signUp(values);

  const signOut = () => mainAuth.signOut(() => {
    localStorage.removeItem('USER_ACCESS_TOKEN');
    dispatch(resetStore());
  });

  return {
    signIn,
    signUp,
    signOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
