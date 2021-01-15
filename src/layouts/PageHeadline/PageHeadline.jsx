import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/ru';
import { setDate } from '../../store/action-creator';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/PageTitle/PageTitle';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import styles from './PageHeadline.module.scss';

const PageHeadline = (props) => {
  const {
    breadcrumbs,
    title,
    date,
  } = props;
  const {
    pageHeadline,
    pageHeadlineFlexInner,
  } = styles;

  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(formatDate(date, 'LL', 'ru'));

  useEffect(() => {
    // TODO: Функция запроса данных с сервера на основе даты. Необходимо переводить дату в UNIX.

  }, [selectedDay]);

  const onDateChange = (newDate) => {
    setSelectedDay(formatDate(newDate, 'LL', 'ru'));
    dispatch(setDate(moment.utc(newDate).unix()));
  };

  return (
    <div className={pageHeadline}>
      {breadcrumbs.length > 0
        && <Breadcrumbs items={breadcrumbs} />}
      <PageContainer>
        <div className={pageHeadlineFlexInner}>
          <PageTitle title={title} />
          {
            date && (
              <DayPickerInput
                spellcheck="false"
                formatDate={formatDate}
                parseDate={parseDate}
                format="LL"
                value={selectedDay}
                keepFocus={false}
                dayPickerProps={{
                  locale: 'ru',
                  localeUtils: MomentLocaleUtils,
                  firstDayOfWeek: 1,
                  todayButton: 'Сегодня',
                }}
                onDayChange={((day) => onDateChange(day))}
                style={{ transform: breadcrumbs.length > 0 ? 'translateY(-40px)' : 'none' }}
              />
            )
          }
        </div>
      </PageContainer>
    </div>
  );
};

PageHeadline.defaultProps = {
  date: null,
  breadcrumbs: [],
};

PageHeadline.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
};

export default PageHeadline;
