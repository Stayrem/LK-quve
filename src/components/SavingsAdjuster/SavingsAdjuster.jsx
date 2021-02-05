import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import isNil from 'lodash/isNil';
import Skeleton from 'react-loading-skeleton';
import { getBeginOfMonth, getFormatedNumber } from '@utils/functions';
import Select from 'react-select';
import useDebounce from '../../hooks/use-debounce';

import dictionary from '../../utils/dictionary';
import { editSavingsData } from '../../store/action-creator';
import styles from './SavingsAdjuster.module.scss';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';

const colors = {
  primary: '#17314c',
  primary75: '#17314c',
  primary50: '#17314c',
  primary25: '#17314c',

  danger: '#DE350B',
  dangerLight: '#FFBDAD',

  neutral0: '#17314c',
  neutral5: '#17314c',
  neutral10: '#17314c',
  neutral20: '#17314c',
  neutral30: '#17314c',
  neutral40: '#ffffff',
  neutral50: '#ffffff',
  neutral60: '#ffffff',
  neutral70: '#ffffff',
  neutral80: '#ffffff',
  neutral90: '#ffffff',
};

const options = [
  { label: 'Сумма', value: 0 },
  { label: 'Процент', value: 1 },
];

const SavingsAdjuster = (props) => {
  const dispatch = useDispatch();

  const {
    date,
    currentIncomesSum,
    currentSavings,
    type,
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
    savingsAdjusterCalculationsWrapper,
    savingsAdjusterCalculation,
    savingsAdjusterRangeFiller,
    savingsAdjusterSelectWrapper,
  } = styles;

  const [newSavingsValue, setNewSavingsValue] = useState(null);
  const [newSavingsPercent, setNewSavingsPercent] = useState(null);
  const [isNewSavingsValueChanged, setIsNewSavingsValueChanged] = useState(false);
  const [isSavingsPercent, changeSavingsType] = useState(type);

  const rangeInput = useRef(null);
  const newSavingsPercentInput = useRef(null);

  const onSavingsChange = (savingsType, value) => {
    let newPercent = null;
    let newValue = null;

    if (savingsType === dictionary.SAVINGS_INPUT_TYPE_PERCENTS) {
      newPercent = value > 100 ? 100 : value;
      newValue = ((currentIncomesSum * newPercent) / 100);
    } else if (savingsType === dictionary.SAVINGS_INPUT_TYPE_VALUE) {
      newValue = value > currentIncomesSum ? currentIncomesSum : value;
      newPercent = Math.round((newValue / currentIncomesSum) * 100);
    }

    if (newValue !== newSavingsValue || newValue !== newSavingsPercent) {
      setNewSavingsPercent(newPercent);
      setNewSavingsValue(newValue);
      rangeInput.current.value = newPercent;
      newSavingsPercentInput.current.value = isSavingsPercent ? newPercent : newValue;
      setIsNewSavingsValueChanged(true);
    }
  };

  const newSavings = useDebounce(newSavingsValue, 300);

  useEffect(() => {
    if (isNewSavingsValueChanged) {
      dispatch(editSavingsData({
        date: getBeginOfMonth(date),
        value: newSavingsValue,
        percent: newSavingsPercent,
      }));
      setIsNewSavingsValueChanged(false);
    }
  }, [newSavings]);

  useEffect(() => {
    if (newSavingsPercent && newSavingsValue) {
      newSavingsPercentInput.current.value = isSavingsPercent ? newSavingsPercent : newSavingsValue;
    }
  }, [isSavingsPercent]);

  useEffect(() => {
    if (currentSavings && currentIncomesSum) {
      setNewSavingsValue(currentSavings.value);
      setNewSavingsPercent(currentSavings.percent);
    }
  }, [currentSavings, currentIncomesSum]);
  return (
    <div className={['panel', savingsAdjuster, 'mb-3'].join(' ')}>
      <div className={['panel-header', savingsAdjusterHeader].join(' ')}>
        <div className={['panel-header-title', savingsAdjusterHeaderTitle].join(' ')}>
          Размер сбережений
        </div>
        <div className={['panel-header-subtitle', savingsAdjusterHeaderDate].join(' ')}>
          <SkeletonContainer>
            {date
              ? `За ${moment(date * 1000).format('MMMM YYYY')}`
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
                  defaultValue={isSavingsPercent ? newSavingsPercent : newSavingsValue}
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
                  <div className={[savingsAdjusterInput, isSavingsPercent ? `${savingsAdjusterInputPercentage}` : ''].join(' ')}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="30"
                      ref={newSavingsPercentInput}
                      defaultValue={newSavingsPercent}
                      onChange={() => onSavingsChange(
                        isSavingsPercent ? dictionary
                          .SAVINGS_INPUT_TYPE_PERCENTS : dictionary.SAVINGS_INPUT_TYPE_VALUE,
                        newSavingsPercentInput.current.value,
                      )}
                    />
                  </div>
                  <div className={savingsAdjusterSelectWrapper}>
                    <Select
                      options={[options[!isSavingsPercent ? 1 : 0]]}
                      onChange={(option) => changeSavingsType(option.value)}
                      classNamePrefix="quve"
                      isSearchable={false}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => <FontAwesomeIcon icon={faChevronDown} />,
                      }}
                      defaultValue={options[isSavingsPercent]}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          ...colors,
                        },
                      })}
                    />
                  </div>
                </div>
                <div className={[savingsAdjusterInputsLabel, 'mt-2'].join(' ')}>
                  От дохода&nbsp;
                  <span>
                    {!isNil(currentIncomesSum)
                      ? `${getFormatedNumber(currentIncomesSum)}`
                      : <Skeleton />}
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
  type: 0,
  currentIncomesSum: null,
  currentSavings: {
    date: null,
    percent: 0,
    value: 0,
  },
};

SavingsAdjuster.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  type: PropTypes.number,
  currentIncomesSum: PropTypes.number,
  currentSavings: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
    percent: PropTypes.number,
    value: PropTypes.number,
  }),
};

export default SavingsAdjuster;
