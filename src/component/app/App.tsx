import * as React from 'react';
import styles from './App.module.scss';

const App = () => {
  const { myApp } = styles;
  return <div className={myApp}> Hi</div>;
};

export default App;
