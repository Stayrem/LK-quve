import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/ru';
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

  const [selectedDay, setSelectedDay] = useState(formatDate(date, 'LL', 'ru'));

  useEffect(() => {
    // TODO: Функция запроса данных с сервера на основе даты. Необходимо переводить дату в UNIX.
    console.log(selectedDay);
  }, [selectedDay]);

  return (
    <div className={pageHeadline}>
      {breadcrumbs.length > 0
        && <Breadcrumbs items={breadcrumbs} />}
      <PageContainer>
        <div className={pageHeadlineFlexInner}>
          <PageTitle title={title} />
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
            onDayChange={((day) => setSelectedDay(day))}
            style={{ transform: breadcrumbs.length > 0 ? 'translateY(-40px)' : 'none' }}
          />
        </div>
      </PageContainer>
    </div>
  );
};

PageHeadline.defaultProps = {
  breadcrumbs: [],
};

PageHeadline.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default PageHeadline;
