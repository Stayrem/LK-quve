import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

export default (mounthSpendingsSum, moneyRemains, currentSavingSum, Component) => ([
  {
    title: 'Траты за сегодня',
    text: mounthSpendingsSum,
    subTitle: `Осталось: ${moneyRemains}`,
    textColor: mounthSpendingsSum > 0 ? '#7DC900' : '#FC4349',
  },
  {
    title: 'Бюджет на день',
    text: moneyRemains / moment().daysInMonth(),
    subTitle: `На ${moment().format('D MMMM YYYY')}`,
    textColor: moneyRemains / moment().daysInMonth() > 0 ? '#7DC900' : '#FC4349',
  },
  {
    title: 'Сбережения',
    text: currentSavingSum,
    subTitle: `В ${moment().format('MMMM')}`,
    textColor: '#ffffff',
  },
  {
    title: 'Остаток до конца месяца',
    text: moneyRemains,
    textColor: moneyRemains > 0 ? '#7DC900' : '#FC4349',
    subTitle: (
      <Component restPercent={(mounthSpendingsSum * 100) / moneyRemains} />
    ),
  },
]);
