import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ru from 'date-fns/locale/ru';
import { setDate } from '../../store/action-creator';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/PageTitle/PageTitle';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import styles from './PageHeadline.module.scss';

registerLocale('ru', ru); // register it with the name you want

const CustomInput = (props) => {
  const { value, onClick } = props;
  const {
    dayPickerBtn,
    dayPickerBtnText,
  } = styles;
  return (
    <button type="button" className={dayPickerBtn} onClick={onClick}>
      <FontAwesomeIcon icon={faCalendarAlt} color="#5C6875" />
      <span className={dayPickerBtnText}>{value}</span>
    </button>
  );
};

const PageHeadline = (props) => {
  const {
    breadcrumbs,
    title,
    date,
    MONTHFormat,
  } = props;
  const {
    pageHeadline,
    pageHeadlineFlexInner,
    dayPicker,
  } = styles;

  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState(date);

  useEffect(() => {
    // TODO: Функция запроса данных с сервера на основе даты. Необходимо переводить дату в UNIX.
    dispatch(setDate(selectedDay));
  }, [selectedDay]);

  const startOfYear = moment().startOf('year').toDate();
  const futureDate = moment().toDate();

  return (
    <div className={pageHeadline}>
      {breadcrumbs.length > 0
        && <Breadcrumbs items={breadcrumbs} />}
      <PageContainer>
        <div className={pageHeadlineFlexInner}>
          <PageTitle title={title} />
          {
            date && (
            <div className={dayPicker}>
              <DatePicker
                customInput={<CustomInput />}
                selected={selectedDay}
                locale={ru}
                minDate={startOfYear}
                maxDate={futureDate}
                showMonthYearPicker={MONTHFormat}
                dateFormat={MONTHFormat ? 'MMMM yyyy' : 'd MMMM yyyy'}
                onChange={(dateIt) => setSelectedDay(moment(dateIt).unix() * 1000)}
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
      </PageContainer>
    </div>
  );
};

PageHeadline.defaultProps = {
  date: null,
  breadcrumbs: [],
  MONTHFormat: false,
};

PageHeadline.propTypes = {
  MONTHFormat: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
};

CustomInput.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PageHeadline;
