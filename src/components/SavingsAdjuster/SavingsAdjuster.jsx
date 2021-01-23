import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';
import isNil from 'lodash/isNil';
import Skeleton from 'react-loading-skeleton';

import dictionary from '../../utils/dictionary';
import { updateSavingsData } from '../../store/action-creator';
import styles from './SavingsAdjuster.module.scss';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';
import { getFormatedNumber } from '@utils/functions';

const SavingsAdjuster = (props) => {
  const dispatch = useDispatch();

  const {
    date,
    incomesCurrentMonthSum,
    savingsCurrentMonthSum,
  } = props;

  const {
    savingsAdjuster,
    savingsAdjusterHeader,
    savingsAdjusterHeaderTitle,
    savingsAdjusterHeaderDate,
    savingsAdjusterBody,
    savingsAdjusterRange,
    savingsAdjusterInputsWrapper,
    savingsAdjusterInputsLabel,
    savingsAdjusterInput,
    savingsAdjusterInputPercentage,
    savingsAdjusterTextDivider,
    savingsAdjusterCalculationsWrapper,
    savingsAdjusterCalculation,
    savingsAdjusterRangeFiller,
  } = styles;

  const [newSavingsValue, setNewSavingsValue] = useState(null);
  const [newSavingsPercent, setNewSavingsPercent] = useState(null);
  const [isNewSavingsValueChanged, setIsNewSavingsValueChanged] = useState(false);

  const rangeInput = useRef(null);
  const newSavingsPercentInput = useRef(null);
  const newSavingsValueInput = useRef(null);

  const onSavingsChange = (type, value) => {
    let newPercent = null;
    let newValue = null;

    if (type === dictionary.SAVINGS_INPUT_TYPE_PERCENTS) {
      newPercent = value > 100 ? 100 : value;
      newValue = ((incomesCurrentMonthSum * newPercent) / 100);
    } else if (type === dictionary.SAVINGS_INPUT_TYPE_VALUE) {
      newValue = value > incomesCurrentMonthSum ? incomesCurrentMonthSum : value;
      newPercent = Math.round((newValue / incomesCurrentMonthSum) * 100);
    }

    if (newValue !== newSavingsValue || newValue !== newSavingsPercent) {
      setNewSavingsPercent(newPercent);
      setNewSavingsValue(newValue);
      rangeInput.current.value = newPercent;
      newSavingsPercentInput.current.value = newPercent;
      newSavingsValueInput.current.value = newValue;
      setIsNewSavingsValueChanged(true);
    }
  };

  useEffect(() => {
    if (isNewSavingsValueChanged) {
      dispatch(updateSavingsData({ date, value: newSavingsValue, percent: newSavingsPercent }));
      setIsNewSavingsValueChanged(false);
    }
  }, [isNewSavingsValueChanged]);

  useEffect(() => {
    if (!isNil(savingsCurrentMonthSum) && !isNil(incomesCurrentMonthSum)) {
      setNewSavingsValue(savingsCurrentMonthSum);
      setNewSavingsPercent(Math.round((savingsCurrentMonthSum / incomesCurrentMonthSum) * 100));
    }
  }, [savingsCurrentMonthSum, incomesCurrentMonthSum]);

  return (
    <div className={['panel', savingsAdjuster, 'mb-3'].join(' ')}>
      <div className={['panel-header', savingsAdjusterHeader].join(' ')}>
        <div className={['panel-header-title', savingsAdjusterHeaderTitle].join(' ')}>
          Размер сбережений
        </div>
        <div className={['panel-header-subtitle', savingsAdjusterHeaderDate].join(' ')}>
          <SkeletonContainer>
            {date
              ? moment(date * 1000).format('MMMM YYYY')
              : (
                <Skeleton width={50} height={20} />
              )}
          </SkeletonContainer>
        </div>
      </div>
      <div className={['panel-body', savingsAdjusterBody].join(' ')}>
        <SkeletonContainer>
          {(!isNil(newSavingsValue) && !isNil(newSavingsPercent))
            ? (
              <div className={savingsAdjusterRange}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  ref={rangeInput}
                  defaultValue={newSavingsPercent}
                  onChange={() => onSavingsChange(
                    dictionary.SAVINGS_INPUT_TYPE_PERCENTS, rangeInput.current.value,
                  )}
                />
                <div className={savingsAdjusterRangeFiller} style={{ width: `${newSavingsPercent}%` }} />
              </div>
            ) : (
              <Skeleton />
            )}
        </SkeletonContainer>
        <SkeletonContainer>
          {(!isNil(newSavingsValue) && !isNil(newSavingsPercent))
            ? (
              <div>
                <div className={savingsAdjusterInputsWrapper}>
                  <div className={[savingsAdjusterInput, savingsAdjusterInputPercentage].join(' ')}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="30"
                      ref={newSavingsPercentInput}
                      defaultValue={newSavingsPercent}
                      onChange={() => onSavingsChange(
                        dictionary
                          .SAVINGS_INPUT_TYPE_PERCENTS, newSavingsPercentInput.current.value,
                      )}
                    />
                  </div>
                  <div className={savingsAdjusterTextDivider}>
                    или
                  </div>
                  <div className={savingsAdjusterInput}>
                    <input
                      type="number"
                      min="0"
                      placeholder="15000"
                      ref={newSavingsValueInput}
                      defaultValue={newSavingsValue}
                      onChange={() => onSavingsChange(
                        dictionary.SAVINGS_INPUT_TYPE_VALUE, newSavingsValueInput.current.value,
                      )}
                    />
                  </div>
                </div>
                <div className={[savingsAdjusterInputsLabel, 'mt-2'].join(' ')}>
                  От дохода&nbsp;
                  <span>
                    {!isNil(incomesCurrentMonthSum)
                      ? `${getFormatedNumber(incomesCurrentMonthSum)}`
                      : <Skeleton />
                    }
                  </span>
                  &nbsp;в месяц
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <Skeleton height={45} />
              </div>
            )}
        </SkeletonContainer>
      </div>
      <div className="panel-footer">
        <div className={savingsAdjusterCalculationsWrapper}>
          <div className={[savingsAdjusterCalculation, 'mb-3'].join(' ')}>
            <SkeletonContainer>
              {(!isNil(newSavingsValue) && !isNil(newSavingsPercent))
                ? `= ${getFormatedNumber(newSavingsValue)} в месяц`
                : (
                  <Skeleton />
                )}
            </SkeletonContainer>
          </div>
          <div className={savingsAdjusterCalculation}>
            <SkeletonContainer>
              {(!isNil(newSavingsValue) && !isNil(newSavingsPercent))
                ? `= ${getFormatedNumber(newSavingsValue * 12)} в год`
                : (
                  <Skeleton />
                )}
            </SkeletonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

SavingsAdjuster.defaultProps = {
  date: null,
  incomesCurrentMonthSum: null,
  savingsCurrentMonthSum: null,
};

SavingsAdjuster.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  incomesCurrentMonthSum: PropTypes.number,
  savingsCurrentMonthSum: PropTypes.number,
};

export default SavingsAdjuster;
