import * as React from 'react';
import styles from './App.module.scss';
import icon from '../../shared-assets/xd.png';

const App = () => {
  const { myApp } = styles;
  return <div className={myApp}><img src={icon} width="20" height="20px" /></div>;
};

export default App;
