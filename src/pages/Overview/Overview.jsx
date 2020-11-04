import React, { useEffect } from 'react';
import * as moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from 'lodash/isEmpty';
import { getDefaultData } from '../../store/action-creator';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import styles from './Overview.module.scss';
import Saldo from '../../components/Saldo/Saldo';
import RestSumWidget from '../../components/RestSumWidget/RestSumWidget';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';

const getSumByArray = (arr) => {
  const reducer = (accumulator, currentItem) => {
    if (currentItem.value !== '' && currentItem.status !== false) {
      return accumulator + parseInt(currentItem.value, 10);
    }
    return accumulator;
  };
  return arr.reduce(reducer, 0);
};

const Overview = () => {
  const dispatch = useDispatch();
  const saldoData = useSelector((state) => state.overview.saldo);
  const overviewData = useSelector((state) => state.overview.data);
  const spendings = useSelector((state) => state.overview.spendings);

  useEffect(() => {
    if (saldoData.length === 0 || overviewData.length === 0) {
      dispatch(getDefaultData());
    }
  }, []);

  const {
    cardElippser, cardScroller, cardWrapper, inner,
  } = styles;
  return (
    (() => {
      if (saldoData.length > 0 && !isEmpty(overviewData)) {
        const {
          date,
          incomesSum,
          costsSum,
          savingSum,
          spendingsPreviousSum,
        } = overviewData;

        const spendingsTodaySum = getSumByArray(spendings);
        const day = moment(date).format('DD MMMM YYYY');
        const month = moment(date).format('MMMM');
        const profit = incomesSum - costsSum - savingsCurrent;
        const budgetFixed = Math.floor(profit / moment(date).daysInMonth());
        const budgetToday = saldoData[saldoData.length - 1].value + budgetFixed;
        const restSum = profit - spendingsPreviousSum - spendingsTodaySum;
        const restPercent = Math.floor((restSum / profit) * 100);
        const cards = [
          {
            id: 0,
            title: 'Траты за сегодня',
            text: spendingsTodaySum,
            textColor: (budgetToday - spendingsTodaySum) > 0 ? '#7DC900' : '#FC4349',
            subTitle: `Осталось: ${budgetToday - spendingsTodaySum}`,
          },
          {
            id: 1,
            title: 'Бюджет на день',
            text: budgetToday,
            textColor: budgetToday > 0 ? '#7DC900' : '#FC4349',
            subTitle: day,
          },
          {
            id: 2,
            title: 'Сбережения',
            text: savingsCurrent,
            textColor: '#ffffff',
            subTitle: `на ${month}`,
          },
          {
            id: 3,
            title: 'Остаток до конца месяца',
            text: restSum,
            textColor: '#ffffff',
            subTitle: (<RestSumWidget restPercent={restPercent > 0 ? restPercent : 0} />),
          },
        ];
        return (
          <main className="main">
            <PageHeadline title="Сводка" date={moment.unix(date).utc()} />
            <PageContainer>
              <div className={cardElippser}>
                <div className={cardScroller}>
                  <div className={cardWrapper}>
                    {cards.map((card) => <Card key={card.id} content={card} />)}
                  </div>
                </div>
              </div>
              <div className={inner}>
                <ExpensesList
                  spendings={spendings}
                />
                <Saldo graphData={saldoData} />
              </div>
            </PageContainer>
          </main>
        );
      }
      return <OverviewPreloader />;
    })()

  );
};

export default Overview;
