import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageTitle.module.scss';

const PageTitle = (props) => {
  const { title } = props;
  const { pageTitle } = styles;
  return <h1 className={pageTitle}>{title}</h1>;
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
