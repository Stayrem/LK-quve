import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardSpending.module.scss';
import { useStore } from '../../store/StoreContext';

const CardSpending = (props) => {
  const {
    title,
    text,
    profit,
    subtitle,
    rangeFil,
  } = props;

  const {
    card,
    cardTitle,
    cardText,
    cardSubtitle,
    cardTextLoss,
    cardTextProfit,
  } = styles;

  const store = useStore();
  const textColorClassname = () => {
    if (profit) {
      return cardTextProfit;
    }
    if (!profit) {
      return cardTextLoss;
    }
    return '';
  };

  return (
    <div className={card}>
      <p className={cardTitle}>Траты сегодня</p>
      <span className={[cardText, textColorClassname()].join(' ')}>{text}</span>
      {(() => {
        if (typeof subtitle === 'undefined') {
          return (
            <div>
              <div data-fill={rangeFil} />
            </div>
          );
        }
        return <p className={cardSubtitle}>{subtitle}</p>;
      })()}
    </div>
  );
};

export default CardSpending;
