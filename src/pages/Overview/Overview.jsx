/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dictionary from '@utils/dictionary';
import Card from '../../components/Cart/Card';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import DataInputList from '../../components/DataInputList/DataInputList';
import Saldo from '../../components/Saldo/Saldo';
import {
  getOverviewData, addSpending, deleteSpending, editSpending,
} from '../../store/action-creator';
import createCards from '../../utils/create-cards';
import styles from './Overview.scss';
import Tooltip from '../../components/Tooltip/Tooltip';

const Overview = () => {
  const {
    cardElippser, cardScroller, cardWrapper,
  } = styles;

  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const currentDailyBudget = useSelector((state) => state.currentDailyBudget);
  const currentDaySpendingsSum = useSelector((state) => state.currentDaySpendingsSum);
  const currentSavingsSum = useSelector((state) => state.currentSavingsSum);
  const currentRestValue = useSelector((state) => state.currentRestValue);
  const currentRestPercent = useSelector((state) => state.currentRestPercent);
  const currentDaySpendings = useSelector((state) => state.currentDaySpendings);

  const isIncomesFetched = useSelector((state) => state.isIncomesFethed);
  const isCostsFetched = useSelector((state) => state.isCostsFetched);
  const isSavingsFetched = useSelector((state) => state.isSavingsFetched);
  const isSpendingsFetched = useSelector((state) => state.isSpendingsFetched);
  const isDataFetched = [isIncomesFetched, isCostsFetched, isSpendingsFetched, isSavingsFetched]
    .every((isDataTypeFethed) => isDataTypeFethed === true);
  const isCartsDataReady = [currentDailyBudget, currentDaySpendingsSum, currentSavingsSum,
    currentRestValue, currentRestPercent]
    .every((data) => data !== null);

  const getCardsState = createCards(currentDailyBudget, currentDaySpendingsSum, currentSavingsSum,
    currentRestValue, currentRestPercent);

  useEffect(() => {
    dispatch(getOverviewData());
    document.title = `Сводка — ${dictionary.APP_NAME}`;
  }, []);

  return (
    (() => (
      <>
        <PageContainer>
          <PageHeadline title="Сводка" date={date} />
        </PageContainer>
        <PageContainer>
          <div className="row">
            <div className="col mb-3 mb-md-4">
              <div className={cardElippser}>
                <div className={cardScroller}>
                  <div className={cardWrapper}>
                    {getCardsState.map((cart) => (
                      <Card
                        key={cart.title}
                        {...cart}
                        isCartsDataReady={isCartsDataReady && isDataFetched}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <DataInputList
                sum={currentDaySpendingsSum}
                data={currentDaySpendings}
                title="Список трат за сегодня"
                subtitle={(
                  <Tooltip
                    text="Сюда необходимо вводить траты за день. Можно вводить сразу всю сумму, потраченную за день."
                    id="spendings"
                  />
                )}
                useStatus={false}
                onAdd={() => dispatch(addSpending())}
                onDelete={(id) => dispatch(deleteSpending(id))}
                onEdit={(spending) => dispatch(editSpending(spending))}
              />
            </div>
            <div className="col-lg-6 mb-3 mb-lg-0">
              <Saldo />
            </div>
          </div>
        </PageContainer>
      </>
    ))()
  );
};

export default Overview;
