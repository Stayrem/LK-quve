import React from 'react';
import styles from './ExpensesListPreloader.scss';

const ExpensesListPreloader = () => {
  const { expenses } = styles;
  return <div className={expenses} />;
};

export default ExpensesListPreloader;
