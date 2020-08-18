import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardSpending.module.scss';
import { useStore } from '../../store/StoreContext';

const CardSpending = (props) => {
  const { content } = props;
  const {
    title, text, textcolor, subTitle,
  } = content;
  const {
    card,
    cardTitle,
    cardText,
    cardSubtitle,
  } = styles;

  return (
    <div className={card}>
      <p className={cardTitle}>{title}</p>
      <span style={{ color: textcolor }} className={cardText}>{text}</span>
      <p className={cardSubtitle}>{subTitle}</p>
    </div>
  );
};

export default CardSpending;
