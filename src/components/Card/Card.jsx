import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = (props) => {
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
      <div className={cardSubtitle}>{subTitle}</div>
    </div>
  );
};

Card.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.number.isRequired,
    textcolor: PropTypes.string.isRequired,
    subTitle: PropTypes.any.isRequired,
  }).isRequired,
};

export default Card;
