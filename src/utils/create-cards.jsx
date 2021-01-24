import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Tooltip from '../components/Tooltip/Tooltip';

export default (mounthSpendingsSum, moneyRemains, currentSavingSum, Component) => ([
  {
    title: 'Траты за сегодня',
    text: mounthSpendingsSum,
    subTitle: `Осталось: ${moneyRemains}`,
    textColor: mounthSpendingsSum > 0 ? '#7DC900' : '#FC4349',
    tooltip: <Tooltip
      id="card-spendings"
      text="Сумма, потраченная за текущий день и остаток денег, которые можно сегодня комфортно потратить."
    />,
  },
  {
    title: 'Бюджет на день',
    text: moneyRemains / moment().daysInMonth(),
    subTitle: `На ${moment().format('D MMMM YYYY')}`,
    textColor: moneyRemains / moment().daysInMonth() > 0 ? '#7DC900' : '#FC4349',
    tooltip: <Tooltip
      id="card-day-budget"
      text="Столько можно комфортно потратить сегодня не выбиваясь из месячного бюджета."
    />,
  },
  {
    title: 'Сбережения',
    text: currentSavingSum,
    subTitle: `В ${moment().format('MMMM')}`,
    textColor: '#ffffff',
    tooltip: <Tooltip
      id="card-savings"
      text="Сумма сбережений за текущий месяц."
    />,
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
