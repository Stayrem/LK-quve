import * as React from 'react';
import Header from '../Header/Header';
import styles from './App.module.scss';


const App = () => {
  const { wrapper } = styles;
  return (
    <div className={wrapper}>
      <Header />
    </div>
      
  );
};

export default App;
