import React, {
  useState, useContext, createContext,
} from 'react';
import fetchData from '@utils/fetch';
import { useDispatch } from 'react-redux';
import { resetStore } from '../store/action-creator';

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
  const authorizedUser = localStorage.getItem('user');
  const [user, setUser] = useState(authorizedUser || null);

  const signIn = (values) => mainAuth.signIn(values, (token) => {
    setUser(token);
    localStorage.setItem('user', token);
  });

  const signUp = (values) => mainAuth.signUp(values);

  const signOut = () => mainAuth.signOut(() => {
    setUser(false);
    localStorage.removeItem('user');
    dispatch(resetStore());
  });

  return {
    user,
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
