import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Cart/Card';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageTitle from '../../components/PageTitle/PageTitle';
import DataInputList from '../../components/DataInputList/DataInputList';
import RestSumWidget from '../../components/RestSumWidget/RestSumWidget';
import { getOverviewData, addSpending, deleteSpending, editSpending } from '../../store/action-creator';
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
  const incomesSum = useSelector((state) => state.incomesSum);
  const isIncomesFethed = useSelector((state) => state.isIncomesFethed);
  const isCostsFetched = useSelector((state) => state.isCostsFetched);
  const isSpendingsFetched = useSelector((state) => state.isSpendingsFetched);
  const isSavingsFetched = useSelector((state) => state.isSavingsFetched);
  const isDataFethed = [isIncomesFethed, isCostsFetched, isSpendingsFetched, isSavingsFetched]
    .every((isDataTypeFethed) => isDataTypeFethed === true);
  const isCartsDataReady = [mounthSpendingsSum, moneyRemains, currentSavingSum]
    .every((data) => data !== null);

  const getCartState = () => ([
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
        <RestSumWidget restPercent={(mounthSpendingsSum * 100) / moneyRemains} />
      ),
    },
  ]);

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
                  {getCartState().map((cart) => <Card key={cart.title} {...cart} />)}
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
