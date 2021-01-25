import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import React, { forwardRef } from 'react';
import styles from './Calendar.module.scss';

const Calendar = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { value, onClick } = props;
  const {
    calendar,
    calendarText,
  } = styles;
  return (
    <button type="button" className={calendar} onClick={onClick} ref={ref}>
      <FontAwesomeIcon icon={faCalendarAlt} color="#6aded4" />
      <span className={calendarText}>{value}</span>
    </button>
  );
};

export default forwardRef(Calendar);
