/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Cart/Card';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageTitle from '../../components/PageTitle/PageTitle';
import DataInputList from '../../components/DataInputList/DataInputList';
import RestSumWidget from '../../components/RestSumWidget/RestSumWidget';
import Saldo from '../../components/Saldo/Saldo';
import {
  getOverviewData, addSpending, deleteSpending, editSpending,
} from '../../store/action-creator';
import createCards from '../../utils/create-cards';
import styles from './Overview.scss';

const Overview = () => {
  const {
    cardElippser, cardScroller, cardWrapper,
  } = styles;
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const mounthSpendingsSum = useSelector((state) => state.mounthSpendingsSum);
  const daySpendings = useSelector((state) => state.selectedDaySpendings);
  const moneyRemains = useSelector((state) => state.moneyRemains);
  const currentSavingSum = useSelector((state) => state.currentSavingSum);
  const isIncomesFethed = useSelector((state) => state.isIncomesFethed);
  const isCostsFetched = useSelector((state) => state.isCostsFetched);
  const isSpendingsFetched = useSelector((state) => state.isSpendingsFetched);
  const isSavingsFetched = useSelector((state) => state.isSavingsFetched);
  const isDataFethed = [isIncomesFethed, isCostsFetched, isSpendingsFetched, isSavingsFetched]
    .every((isDataTypeFethed) => isDataTypeFethed === true);
  const isCartsDataReady = [mounthSpendingsSum, moneyRemains, currentSavingSum]
    .every((data) => data !== null);

  const getCardsState = createCards(mounthSpendingsSum,
    moneyRemains, currentSavingSum, RestSumWidget);

  useEffect(() => {
    dispatch(getOverviewData());
  }, []);
  return (
    isDataFethed && isCartsDataReady && (
    <>
      <PageContainer>
        <PageTitle title="Сводка" />
      </PageContainer>
      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <div className={cardElippser}>
              <div className={cardScroller}>
                <div className={cardWrapper}>
                  {getCardsState.map((cart) => <Card key={cart.title} {...cart} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <DataInputList
              date={date * 1000}
              sum={mounthSpendingsSum}
              data={daySpendings}
              title="Список трат за сегодня"
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
      </div>
      <PageContainer>
        <main />
      </PageContainer>
    </>
    )
  );
};

export default Overview;
