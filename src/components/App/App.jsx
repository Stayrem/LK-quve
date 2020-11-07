import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import Overview from '../../pages/Overview/Overview';
import Incomes from '../../pages/Incomes/Incomes';
import Costs from '../../pages/Costs/Costs';
import styles from './App.module.scss';
import Savings from '../../pages/Savings/Savings';

const App = () => {
  const { wrapper } = styles;
  return (
    <Router>
      <div className={wrapper}>
        <Header />
      </div>
      <Switch>
        <Route path="/overview">
          <Overview />
        </Route>
        <Route path="/incomes">
          <Incomes />
        </Route>
        <Route path="/costs">
          <Costs />
        </Route>
        <Route path="/savings">
          <Savings />
        </Route>
        <Route path="/">
          <Redirect to="/overview" />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
