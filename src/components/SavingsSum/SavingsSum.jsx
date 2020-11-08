import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavingsSum.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
        <SkeletonTheme color="#252A48" highlightColor="#222743">
          <span>
            {value || <Skeleton height={20} width={100} />}
          </span>
        </SkeletonTheme>
      </div>
    </div>
  );
};

SavingsSum.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SavingsSum;
