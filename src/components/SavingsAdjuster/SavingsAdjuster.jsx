import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import isNil from 'lodash/isNil';
import Skeleton from 'react-loading-skeleton';
import {
  getAbsFromValue,
  getBeginOfMonth,
  getFormatedNumber,
  getPercentFromValue,
} from '@utils/functions';
import Select from 'react-select';

import dictionary from '../../utils/dictionary';
import { editSavings } from '../../store/action-creator';
import styles from './SavingsAdjuster.module.scss';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';
import useDebounce from '../../hooks/use-debounce';

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
  const [isNewSavingsValueChanged, setIsNewSavingsValueChanged] = useState(false);
  const [savingsType, setSavingsType] = useState(null);
  const [isSavingsTypeChanged, setIsSavingsTypeChanged] = useState(false);
  const [isValueAndTypeInited, setIsValueAndTypeInited] = useState(false);

  const rangeInput = useRef(null);
  const newSavingsValueInput = useRef(null);

  const onSavingsChange = (value) => {
    let newValue = null;

    if (savingsType === dictionary.SAVINGS_INPUT_TYPE_PERCENTS) {
      newValue = value > 100 ? 100 : value;
    } else if (savingsType === dictionary.SAVINGS_INPUT_TYPE_VALUE) {
      newValue = value > currentIncomesSum ? currentIncomesSum : value;
    }

    if (newValue !== newSavingsValue) {
      setNewSavingsValue(newValue);
      rangeInput.current.value = getPercentFromValue(newValue, savingsType, currentIncomesSum);
      newSavingsValueInput.current.value = newValue;
      setIsNewSavingsValueChanged(true);
    }
  };

  const onSavingsTypeChanged = (type) => {
    if (type !== savingsType) {
      setSavingsType(type);
      setIsSavingsTypeChanged(true);
    }
  };

  const debouncedNewSavingsValue = useDebounce(newSavingsValue, 500);

  useEffect(() => {
    if (isNewSavingsValueChanged) {
      dispatch(editSavings({
        date: getBeginOfMonth(date),
        value: newSavingsValue,
        type: savingsType,
      }));
      setIsNewSavingsValueChanged(false);
    }
  }, [debouncedNewSavingsValue]);

  useEffect(() => {
    if (isSavingsTypeChanged) {
      const recalculatedValue = savingsType === dictionary.SAVINGS_INPUT_TYPE_VALUE
        ? getAbsFromValue(newSavingsValue, dictionary.SAVINGS_INPUT_TYPE_PERCENTS, currentIncomesSum)
        : getPercentFromValue(newSavingsValue, dictionary.SAVINGS_INPUT_TYPE_VALUE, currentIncomesSum);
      onSavingsChange(recalculatedValue);
      setIsSavingsTypeChanged(false);
    }
  }, [isSavingsTypeChanged]);

  useEffect(() => {
    if (currentSavings && currentIncomesSum && !isValueAndTypeInited) {
      setNewSavingsValue(currentSavings.value);
      setSavingsType(currentSavings.type);
      setIsValueAndTypeInited(true);
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
          {(!isNil(newSavingsValue) && !isNil(savingsType))
            ? (
              <div className={savingsAdjusterRange}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  ref={rangeInput}
                  defaultValue={getPercentFromValue(newSavingsValue, savingsType, currentIncomesSum)}
                  onChange={() => onSavingsChange(savingsType === dictionary.SAVINGS_INPUT_TYPE_PERCENTS
                    ? rangeInput.current.value
                    : getAbsFromValue(rangeInput.current.value, dictionary.SAVINGS_INPUT_TYPE_PERCENTS, currentIncomesSum))}
                />
                <div
                  className={savingsAdjusterRangeFiller}
                  style={{ width: `${getPercentFromValue(newSavingsValue, savingsType, currentIncomesSum)}%` }}
                />
              </div>
            ) : (
              <Skeleton />
            )}
        </SkeletonContainer>
        <SkeletonContainer>
          {(!isNil(newSavingsValue) && !isNil(savingsType))
            ? (
              <div>
                <div className={savingsAdjusterInputsWrapper}>
                  <div className={[savingsAdjusterInput, (savingsType === dictionary.SAVINGS_INPUT_TYPE_PERCENTS) ? `${savingsAdjusterInputPercentage}` : ''].join(' ')}>
                    <input
                      type="number"
                      min="0"
                      placeholder="30"
                      ref={newSavingsValueInput}
                      defaultValue={newSavingsValue}
                      onChange={() => onSavingsChange(newSavingsValueInput.current.value)}
                    />
                  </div>
                  <div className={savingsAdjusterSelectWrapper}>
                    <Select
                      options={[options[savingsType === dictionary.SAVINGS_INPUT_TYPE_VALUE ? 1 : 0]]}
                      onChange={(option) => onSavingsTypeChanged(option.value)}
                      classNamePrefix="quve"
                      isSearchable={false}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator: () => <FontAwesomeIcon icon={faChevronDown} />,
                      }}
                      defaultValue={options[savingsType]}
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
              {(!isNil(newSavingsValue))
                ? `= ${getFormatedNumber(getAbsFromValue(newSavingsValue, savingsType, currentIncomesSum))} в месяц`
                : (
                  <Skeleton />
                )}
            </SkeletonContainer>
          </div>
          <div className={savingsAdjusterCalculation}>
            <SkeletonContainer>
              {(!isNil(newSavingsValue))
                ? `= ${getFormatedNumber(getAbsFromValue(newSavingsValue, savingsType, currentIncomesSum) * 12)} в год`
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
  currentIncomesSum: null,
  currentSavings: {
    date: null,
    type: 0,
    value: 0,
  },
};

SavingsAdjuster.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  currentIncomesSum: PropTypes.number,
  currentSavings: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
    type: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default SavingsAdjuster;
