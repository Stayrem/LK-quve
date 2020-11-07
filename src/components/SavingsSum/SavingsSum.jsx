import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavingsSum.module.scss';

const SavingsSum = (props) => {
  const {
    value,
  } = props;
  const {
    savingsSum,
    savingsSumHeader,
    savingsSumHeaderTitle,
    savingsSumBody,
  } = styles;

  return (
    <div className={['panel', savingsSum].join(' ')}>
      <div className={['panel-header', savingsSumHeader].join(' ')}>
        <div className={['panel-header-title', savingsSumHeaderTitle].join(' ')}>
          Всего сбережений
        </div>
      </div>
      <div className={['panel-body', savingsSumBody].join(' ')}>
        <span>{value}</span>
      </div>
    </div>
  );
};

SavingsSum.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SavingsSum;
