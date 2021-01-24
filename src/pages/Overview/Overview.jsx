/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dictionary from '@utils/dictionary';
import Card from '../../components/Cart/Card';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import DataInputList from '../../components/DataInputList/DataInputList';
import RestSumWidget from '../../components/RestSumWidget/RestSumWidget';
import Saldo from '../../components/Saldo/Saldo';
import ErrorPage from '../ErrorPage/ErrorPage';
import {
  getOverviewData, addSpending, deleteSpending, editSpending, resetStore,
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
  const isFetchFailed = useSelector((state) => state.fetchError);
  const monthSpendingsSum = useSelector((state) => state.monthSpendingsSum);
  const daySpendings = useSelector((state) => state.selectedDaySpendings);
  const moneyRemains = useSelector((state) => state.moneyRemains);
  const currentSavingSum = useSelector((state) => state.currentSavingSum);
  const isIncomesFethed = useSelector((state) => state.isIncomesFethed);
  const isCostsFetched = useSelector((state) => state.isCostsFetched);
  const isSpendingsFetched = useSelector((state) => state.isSpendingsFetched);
  const isSavingsFetched = useSelector((state) => state.isSavingsFetched);
  const isDataFethed = [isIncomesFethed, isCostsFetched, isSpendingsFetched, isSavingsFetched]
    .every((isDataTypeFethed) => isDataTypeFethed === true);
  const isCartsDataReady = [monthSpendingsSum, moneyRemains, currentSavingSum]
    .every((data) => data !== null);

  const getCardsState = createCards(monthSpendingsSum,
    moneyRemains, currentSavingSum, RestSumWidget);

  useEffect(() => {
    dispatch(getOverviewData());
    document.title = `Сводка — ${dictionary.APP_NAME}`;
    return () => dispatch(resetStore());
  }, []);
  return (
    (() => {
      if (isFetchFailed) {
        return <ErrorPage code={500} message="Ошибка" />;
      }
      if (isDataFethed && isCartsDataReady) {
        return (
          <>
            <PageContainer>
              <PageHeadline title="Сводка" date={date} />
            </PageContainer>
            <div className="container">
              <div className="row">
                <div className="col mb-3 mb-md-4">
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
                    date={date}
                    sum={monthSpendingsSum}
                    data={daySpendings}
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
            </div>
            <PageContainer>
              <main />
            </PageContainer>
          </>
        );
      }
      return null;
    })()
  );
};

export default Overview;
