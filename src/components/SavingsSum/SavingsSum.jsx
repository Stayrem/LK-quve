import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import isNil from 'lodash/isNil';
import { getFormatedNumber } from '@utils/functions';
import styles from './SavingsSum.module.scss';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';
import Tooltip from '../Tooltip/Tooltip';

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
        <div className="panel-header-subtitle">
          <Tooltip
            text="Сумма сбережений за текущий год."
            id="savings-sum"
          />
        </div>
      </div>
      <div className={['panel-body', savingsSumBody].join(' ')}>
        <SkeletonContainer>
          <span>
            {!isNil(value) ? getFormatedNumber(value) : <Skeleton height={20} width={100} />}
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
