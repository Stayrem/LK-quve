import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from './routes';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import styles from './App.module.scss';
import { ProvideAuth } from '../../hooks/use-auth';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { initAmplitude } from '../../utils/amplitude';

const App = () => {
  const { wrapper } = styles;

  initAmplitude();

  return (
    <ProvideAuth>
      <Router>
        <div className={wrapper}>
          <Header />
        </div>
        <Switch>
          {routes.map((route) => {
            if (route.isProtected) {
              return (
                <PrivateRoute path={route.path} key={route.path}>
                  <route.component />
                </PrivateRoute>
              );
            }
            return (
              <Route path={route.path} key={route.path}>
                <route.component />
              </Route>
            );
          })}
        </Switch>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </ProvideAuth>
  );
};

export default App;
