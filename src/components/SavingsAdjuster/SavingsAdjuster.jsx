import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SavingsAdjuster.module.scss';
import dictionary from '../../utils/dictionary';

const SavingsAdjuster = (props) => {
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
    savingsAdjusterInput,
    savingsAdjusterInputPercentage,
    savingsAdjusterTextDivider,
    savingsAdjusterCalculationsWrapper,
    savingsAdjusterCalculation,
    savingsAdjusterRangeFiller,
  } = styles;

  const [newSavingsValue, setNewSavingsValue] = useState(savingsCurrentMonthSum);
  const [newSavingsPercent, setNewSavingsPercent] = useState(Math
    .round((savingsCurrentMonthSum / incomesCurrentMonthSum) * 100));
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

    setNewSavingsPercent(newPercent);
    setNewSavingsValue(newValue);
    rangeInput.current.value = newPercent;
    newSavingsPercentInput.current.value = newPercent;
    newSavingsValueInput.current.value = newValue;
  };

  return (
    <div className={[savingsAdjuster, 'mb-3'].join(' ')}>
      <div className={savingsAdjusterHeader}>
        <div className={savingsAdjusterHeaderTitle}>
          Размер сбережений
        </div>
        <div className={savingsAdjusterHeaderDate}>
          {date}
        </div>
      </div>
      <div className={savingsAdjusterBody}>
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
                dictionary.SAVINGS_INPUT_TYPE_PERCENTS, newSavingsPercentInput.current.value,
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
        <div className={savingsAdjusterCalculationsWrapper}>
          <div className={[savingsAdjusterCalculation, 'mb-2'].join(' ')}>
            {`= ${newSavingsValue} в месяц`}
          </div>
          <div className={savingsAdjusterCalculation}>
            {`= ${newSavingsValue * 12} в год`}
          </div>
        </div>
      </div>
    </div>
  );
};

SavingsAdjuster.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  incomesCurrentMonthSum: PropTypes.number.isRequired,
  savingsCurrentMonthSum: PropTypes.number.isRequired,
};

export default SavingsAdjuster;
