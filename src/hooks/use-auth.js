import React, {
  useState, useContext, createContext,
} from 'react';
import fetchData from '@utils/fetch';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
//import { resetStore } from '../store/action-creator';

const mainAuth = {
  isAuthenticated: false,
  async signIn(values, callback) {
    try {
      const response = await fetchData('/api/sign-in', 'POST', values);
      if (response.code === 200) {
        mainAuth.isAuthenticated = true;
        callback(response.token);
      }
    } catch (error) {
      if (error.response.status === 422) {
        toast.error('Некорректные email или пароль.');
      } else {
        toast.error(`Ошибка сервера: ${error.response.status}`);
      }
    }
  },
  signOut(callback) {
    mainAuth.isAuthenticated = false;
    callback();
  },
};

const authContext = createContext();

function useProvideAuth() {
  //const dispatch = useDispatch();
  const authorizedUser = localStorage.getItem('user');
  const [user, setUser] = useState(authorizedUser || null);

  const signIn = (values) => mainAuth.signIn(values, (token) => {
    setUser(token);
    localStorage.setItem('user', token);
  });

  const signOut = () => mainAuth.signOut(() => {
    setUser(false);
    localStorage.removeItem('user');
    //dispatch(resetStore());
  });

  return {
    user,
    signIn,
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
