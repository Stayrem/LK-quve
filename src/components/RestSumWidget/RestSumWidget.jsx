import React from 'react';
import PropTypes from 'prop-types';
import styles from './RestSumWidget.module.scss';

const RestSumWidget = (props) => {
  const { restPercent } = props;
  const { progressBar } = styles;

  return (
    <div className={progressBar}>
      <span style={{ width: `${restPercent}%` }} />
    </div>
  );
};

RestSumWidget.propTypes = {
  restPercent: PropTypes.number,
};

export default RestSumWidget;
