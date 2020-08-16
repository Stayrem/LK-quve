import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardContainer.module.scss';

const CardContainer = (props) => {
  const {
    card,
  } = styles;

  const { children } = props;

  return (
    <div className={card}>
      {children}
    </div>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardContainer;
