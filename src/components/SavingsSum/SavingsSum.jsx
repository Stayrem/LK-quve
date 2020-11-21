import React from 'react';
import PropTypes from 'prop-types';
import styles from './SavingsSum.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';

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
        <SkeletonContainer>
          <span>
            {value || <Skeleton height={20} width={100} />}
          </span>
        </SkeletonContainer>
      </div>
    </div>
  );
};

SavingsSum.defaultProps = {
  value: null,
};

SavingsSum.propTypes = {
  value: PropTypes.number,
};

export default SavingsSum;
