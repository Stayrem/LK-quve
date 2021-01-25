import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Tooltip from '../components/Tooltip/Tooltip';
import RestSumWidget from '../components/RestSumWidget/RestSumWidget';

export default (currentDailyBudget, currentDaySpendingsSum, currentSavingsSum, currentRestValue, currentRestPercent) => ([
  {
    title: 'Траты за сегодня',
    text: currentDaySpendingsSum,
    subTitle: `Осталось: ${currentDailyBudget - currentDaySpendingsSum}`,
    textColor: currentDailyBudget - currentDaySpendingsSum > 0 ? '#7DC900' : '#FC4349',
    tooltip: <Tooltip
      id="card-spendings"
      text="Сумма, потраченная за текущий день и остаток денег, которые можно сегодня комфортно потратить."
    />,
  },
  {
    title: 'Бюджет на день',
    text: currentDailyBudget,
    subTitle: `На ${moment().format('D MMMM YYYY')}`,
    textColor: currentDailyBudget > 0 ? '#7DC900' : '#FC4349',
    tooltip: <Tooltip
      id="card-day-budget"
      text="Столько можно комфортно потратить сегодня не выбиваясь из месячного бюджета."
    />,
  },
  {
    title: 'Сбережения',
    text: currentSavingsSum,
    subTitle: `За ${moment().format('MMMM')}`,
    textColor: '#ffffff',
    tooltip: <Tooltip
      id="card-savings"
      text="Сумма сбережений за текущий месяц."
    />,
  },
  {
    title: 'Остаток до конца месяца',
    text: currentRestValue,
    textColor: currentRestValue > 0 ? '#7DC900' : '#FC4349',
    subTitle: (
      <RestSumWidget restPercent={currentRestPercent} />
    ),
    tooltip: <Tooltip
      id="card-rest"
      text="Столько у Вас остаётся средств до конца месяца, которые можно комфортно потратить."
    />,
  },
]);
