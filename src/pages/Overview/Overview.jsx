import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {
  getDateData,
  getCostsData,
  getIncomesData,
  getSavingsData,
  getSpendingsData,
  getHistoryData,
} from '../../store/action-creator';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import Saldo from '../../components/Saldo/Saldo';
import RestSumWidget from '../../components/RestSumWidget/RestSumWidget';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import DataInputList from '../../components/DataInputList/DataInputList';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';

import styles from './Overview.module.scss';
import dictionary from '../../utils/dictionary';

const Overview = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const spendingsTodaySum = useSelector((state) => state.spendings.spendingsTodaySum);
  const spendingsTodayList = useSelector((state) => state.spendings.spendingsTodayList);
  const spendingsPreviousDaysSum = useSelector((state) => state.history.spendingsPreviousDaysSum);
  const spendingsPreviousDaysList = useSelector((state) => state.history.spendingsPreviousDaysList);
  const incomesCurrentMonthSum = useSelector((state) => state.incomes.incomesCurrentMonthSum);
  const costsCurrentMonthSum = useSelector((state) => state.costs.costsCurrentMonthSum);
  const savingsCurrentMonthSum = useSelector((state) => state.savings.savingsCurrentMonthSum);

  useEffect(() => {
    (async () => {
      if (!date) {
        await dispatch(getDateData());
      }
      if (!spendingsTodaySum || isEmpty(spendingsTodayList)) {
        await dispatch(getSpendingsData());
      }
      if (!spendingsPreviousDaysSum || isEmpty(spendingsPreviousDaysList)) {
        await dispatch(getHistoryData(dictionary.HISTORY_TYPE_SPENDINGS));
      }
      if (!incomesCurrentMonthSum) {
        await dispatch(getIncomesData());
      }
      if (!costsCurrentMonthSum) {
        await dispatch(getCostsData());
      }
      if (!savingsCurrentMonthSum) {
        await dispatch(getSavingsData());
      }
      setIsDataFetched(true);
    })();
  }, []);

  const {
    cardElippser, cardScroller, cardWrapper,
  } = styles;
  return (
    (() => {
      if (isDataFetched) {
        const day = moment(date).format('DD MMMM YYYY');
        const month = moment(date).format('MMMM');
        const profit = incomesCurrentMonthSum - costsCurrentMonthSum - savingsCurrentMonthSum;
        const budgetFixed = Math.floor(profit / moment(date).daysInMonth());
        const budgetToday = spendingsPreviousDaysList[spendingsPreviousDaysList.length - 1]
          .value + budgetFixed;
        const restSum = Math.floor(profit - spendingsPreviousDaysSum - spendingsTodaySum);
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
            text: Math.floor(savingsCurrentMonthSum),
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
            <PageHeadline title="Сводка" date={date} />
            <PageContainer>
              <div className={cardElippser}>
                <div className={cardScroller}>
                  <div className={cardWrapper}>
                    {cards.map((card) => <Card key={card.id} content={card} />)}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <DataInputList
                    date={date}
                    listType={dictionary.DATA_LIST_TYPE_SPENDINGS}
                    sum={spendingsTodaySum}
                    data={spendingsTodayList}
                    title="Список трат за сегодня"
                    useStatus={false}
                    updateDataList={() => {}}
                  />
                </div>
                <div className="col-lg-6">
                  <Saldo graphData={spendingsPreviousDaysList} />
                </div>
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
