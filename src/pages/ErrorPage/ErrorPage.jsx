import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routesDict from '../../utils/routesDict';
import style from './ErrorPage.module.scss';

const ErrorPage = (props) => {
  const { code, message } = props;
  const {
    wrapper,
    statusCode,
    link,
    messageText,
  } = style;
  return (
    <div className={wrapper}>
      <p className={statusCode}>{code}</p>
      <p className={messageText}>{message}</p>
      <Link to={routesDict.OVERVIEW} className={link}>На Главную</Link>
    </div>
  );
};

ErrorPage.defaultProps = {
  code: 404,
  message: 'Страница не найдена',
};

ErrorPage.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string,
};

export default ErrorPage;
