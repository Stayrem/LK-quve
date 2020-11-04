import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SavingsSum.module.scss';
import dictionary from '../../utils/dictionary';

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
    <div className={savingsSum}>
      <div className={savingsSumHeader}>
        <div className={savingsSumHeaderTitle}>
          Всего сбережений
        </div>
      </div>
      <div className={savingsSumBody}>
        <span>{value}</span>
      </div>
    </div>
  );
};

SavingsSum.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SavingsSum;
