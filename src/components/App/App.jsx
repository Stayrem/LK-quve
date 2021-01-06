import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Overview from '../../pages/Overview/Overview';
import Incomes from '../../pages/Incomes/Incomes';
import Costs from '../../pages/Costs/Costs';
import styles from './App.module.scss';
import Savings from '../../pages/Savings/Savings';
import SignUp from '../../pages/SignUp/SignUp';
import { ProvideAuth } from '../../hooks/use-auth';
import SignIn from '../../pages/SignIn/SignIn';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = () => {
  const { wrapper } = styles;
  return (
    <ProvideAuth>
      <Router>
        <div className={wrapper}>
          <Header />
        </div>
        <Switch>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <PrivateRoute path="/overview">
            <Overview />
          </PrivateRoute>
          <PrivateRoute path="/incomes">
            <Incomes />
          </PrivateRoute>
          <PrivateRoute path="/costs">
            <Costs />
          </PrivateRoute>
          <PrivateRoute path="/savings">
            <Savings />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Redirect to="/overview" />
          </PrivateRoute>
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
