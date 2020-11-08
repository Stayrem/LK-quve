import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import dictionary from '../../utils/dictionary';

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

import styles from './Overview.module.scss';

const getRoundedValue = (value) => (value < 0
  ? Math.floor(Math.abs(value) * 100) / -100
  : Math.floor(Math.abs(value) * 100) / 100);
const getBudgetFixed = (profit, date) => getRoundedValue(profit / moment(date).daysInMonth());
const getBudgetToday = (spendingsPreviousDaysSum, fixedBudget) => spendingsPreviousDaysSum + fixedBudget;
const getRestSum = (profit, spendingsPreviousDaysSum, spendingsTodaySum) => getRoundedValue(
  profit - spendingsPreviousDaysSum - spendingsTodaySum,
);
const getRestPercent = (profit, restSum) => getRoundedValue((restSum / profit) * 100);

const Overview = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [profit, setProfit] = useState(0);
  const [budgetToday, setBudgetToday] = useState(0);
  const [restSum, setRestSum] = useState(0);

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

  useEffect(() => {
    document.title = `Сводка | ${dictionary.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (isDataFetched) {
      setProfit(incomesCurrentMonthSum - costsCurrentMonthSum - savingsCurrentMonthSum);
    }
  }, [isDataFetched]);

  useEffect(() => {
    if (profit) {
      setBudgetToday(getBudgetToday(spendingsPreviousDaysList[spendingsPreviousDaysList.length - 1]
        .value, getBudgetFixed(profit, date)));
      setRestSum(getRestSum(profit, spendingsPreviousDaysSum, spendingsTodaySum));
    }
  }, [profit]);

  const {
    cardElippser, cardScroller, cardWrapper,
  } = styles;
  return (
    <main className="main">
      <PageHeadline title="Сводка" date={date} />
      <PageContainer>
        <div className="row">
          <div className="col mb-3">
            <div className={cardElippser}>
              <div className={cardScroller}>
                <div className={cardWrapper}>
                  <Card
                    title="Траты за сегодня"
                    text={spendingsTodaySum}
                    textColor={(budgetToday - spendingsTodaySum) > 0 ? '#48E260' : '#F45050'}
                    subTitle={`Осталось: ${getRoundedValue(budgetToday - spendingsTodaySum)}`}
                  />
                  <Card
                    title="Бюджет на день"
                    text={budgetToday}
                    textColor={budgetToday > 0 ? '#48E260' : '#F45050'}
                    subTitle={moment(date).format('DD MMMM YYYY')}
                  />
                  <Card
                    title="Сбережения"
                    text={savingsCurrentMonthSum}
                    textColor="#ffffff"
                    subTitle={`на ${moment(date).format('MMMM')}`}
                  />
                  <Card
                    title="Остаток до конца месяца"
                    text={restSum}
                    textColor="#ffffff"
                    subTitle={(
                      <RestSumWidget
                        restPercent={getRestPercent(profit, restSum) > 0
                          ? getRestPercent(profit, restSum)
                          : 0
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <DataInputList
              date={date}
              listType={dictionary.DATA_LIST_TYPE_SPENDINGS}
              sum={spendingsTodaySum}
              data={spendingsTodayList}
              title="Список трат за сегодня"
              useStatus={false}
            />
          </div>
          <div className="col-lg-6">
            <Saldo graphData={spendingsPreviousDaysList} />
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default Overview;
