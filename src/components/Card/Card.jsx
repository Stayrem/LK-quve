import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Card = (props) => {
  const {
    title,
    text,
    textColor,
    subTitle,
  } = props;

  const {
    card,
    cardTitle,
    cardText,
    cardSubtitle,
  } = styles;

  return (
    <div className={card}>
      <div className={cardTitle}>{title}</div>
      <SkeletonTheme color="#252A48" highlightColor="#222743">
        <div style={{ color: textColor }} className={cardText}>
          {text || <Skeleton />}
        </div>
        <div className={cardSubtitle}>
          {subTitle || <Skeleton />}
        </div>
      </SkeletonTheme>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,
  subTitle: PropTypes.node.isRequired,
};

export default Card;
