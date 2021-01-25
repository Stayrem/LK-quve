import React, { useState, useEffect, createRef } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { getBeginOfDay } from '@utils/functions';
import { setDate } from '../../store/action-creator';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './PageHeadline.module.scss';
import Calendar from '../../components/Calendar/Calendar';

registerLocale('ru', ru); // register it with the name you want

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
  const [selectedDay, setSelectedDay] = useState(new Date(date * 1000));
  const calendarRef = createRef();

  useEffect(() => {
    dispatch(setDate(getBeginOfDay(moment(selectedDay).utc().unix())));
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
              locale={ru}
              showMonthYearPicker={MonthFormat}
              dateFormat={MonthFormat ? 'За MMMM yyyy' : 'd MMMM yyyy'}
              onChange={(newDate) => setSelectedDay(newDate)}
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
