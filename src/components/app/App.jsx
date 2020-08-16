import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from '../../layouts/Header/Header';
import Overview from '../pages/Overview/Overview';
import styles from './App.module.scss';

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
        <Route path="/">
          <Redirect to="/overview" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
