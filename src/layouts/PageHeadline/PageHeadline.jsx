import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { getBeginOfDay } from '@utils/functions';
import { setDate, setIsDateChanged } from '../../store/action-creator';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './PageHeadline.module.scss';
import Calendar from '../../components/Calendar/Calendar';

const PageHeadline = (props) => {
  const {
    breadcrumbs,
    title,
    date,
    MonthFormat,
  } = props;
  const {
    pageHeadline,
    pageHeadlineFlexInner,
    dayPicker,
  } = styles;

  const dispatch = useDispatch();
  const isDateChanged = useSelector((state) => state.isDateChanged);
  const [selectedDay, setSelectedDay] = useState(new Date(date));
  const calendarRef = createRef();

  const onDateChanged = (value) => {
    setSelectedDay(value);
    dispatch(setIsDateChanged(true));
  };

  useEffect(() => {
    if (isDateChanged) {
      dispatch(setDate(getBeginOfDay(DateTime.local().ts)));
      dispatch(setIsDateChanged(false));
    }
  }, [selectedDay]);

  return (
    <div className={pageHeadline}>
      {breadcrumbs.length > 0
        && <Breadcrumbs items={breadcrumbs} />}
      <div className={pageHeadlineFlexInner}>
        <PageTitle title={title} />
        {
          date && (
          <div className={dayPicker}>
            <DatePicker
              customInput={<Calendar ref={calendarRef} />}
              selected={selectedDay}
              showMonthYearPicker={MonthFormat}
              dateFormat={MonthFormat ? 'MMMM yyyy' : 'd MMMM yyyy'}
              onChange={(newDate) => onDateChanged(newDate)}
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '-105px, 0',
                },
              }}
            />
          </div>
          )
        }
      </div>
    </div>
  );
};

PageHeadline.defaultProps = {
  date: null,
  breadcrumbs: [],
  MonthFormat: false,
};

PageHeadline.propTypes = {
  MonthFormat: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
};

export default PageHeadline;
