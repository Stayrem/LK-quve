import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageText.module.scss';

const PageText = (props) => {
  const { text } = props;
  const { pageText } = styles;

  return (
    <div className={pageText}>
      <p>{text}</p>
    </div>
  );
};

PageText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageText;
