import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';
import styles from './Card.scss';

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
      <SkeletonContainer>
        <div style={{ color: textColor }} className={cardText}>
          {Math.floor(text) || <Skeleton />}
        </div>
      </SkeletonContainer>
      <div className={cardTitle}>{title}</div>
      <SkeletonContainer>
        <div className={cardSubtitle}>
          {subTitle || <Skeleton />}
        </div>
      </SkeletonContainer>
    </div>
  );
};

Card.defaultProps = {
  text: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.number,
  textColor: PropTypes.string.isRequired,
  subTitle: PropTypes.node.isRequired,
};

export default Card;
