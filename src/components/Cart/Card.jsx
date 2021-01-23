import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getFormatedNumber } from '@utils/functions';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';
import styles from './Card.scss';

const Card = (props) => {
  const {
    title,
    text,
    textColor,
    subTitle,
    tooltip,
  } = props;

  const {
    card,
    cardTitle,
    cardText,
    cardSubtitle,
  } = styles;

  return (
    <div className={card}>
      <div className="d-flex justify-content-between">
        <SkeletonContainer>
          <div style={{ color: textColor }} className={cardText}>
            {getFormatedNumber(Math.floor(text)) || <Skeleton />}
          </div>
        </SkeletonContainer>
        {tooltip}
      </div>
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
  tooltip: null,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.number,
  textColor: PropTypes.string.isRequired,
  subTitle: PropTypes.node.isRequired,
  tooltip: PropTypes.node,
};

export default Card;
