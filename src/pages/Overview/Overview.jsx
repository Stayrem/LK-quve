import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import * as moment from 'moment';
import { toJS } from 'mobx';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import Card from '../../components/Card/Card';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import styles from './Overview.module.scss';
import { useStore } from '../../store/StoreContext';
import Saldo from '../../components/Saldo/Saldo';
import RestSumWidget from '../../components/RestSumWidget/RestSumWidget';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';

const Overview = observer(() => {
  const store = useStore();
  const { getOverviewData } = store;
  useEffect(() => {
    getOverviewData();
  }, []);
  const {
    date,

    isOverwiewDataFetched,
    isSaldoDataFetched,

    spendingsTodayList,
    spendingsTodaySum,

    budgetToday,
    savingSum,

    restSum,
    restPercent,

    editSpending,
    addSpending,
    saldoData,
  } = store;

  const {
    cardElippser, cardScroller, cardWrapper, inner,
  } = styles;
  return (
    (() => {
      if (isOverwiewDataFetched && isSaldoDataFetched) {
        const today = moment(date).format('DD MMMM YYYY');
        const month = moment(date).format('MMMM');
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
            subTitle: today,
          },
          {
            id: 2,
            title: 'Сбережения',
            text: savingSum,
            textColor: '#ffffff',
            subTitle: `на ${month}`,
          },
          {
            id: 3,
            title: 'Остаток до конца месяца',
            text: restSum,
            textColor: '#ffffff',
            subTitle: (<RestSumWidget restPercent={restPercent} />),
          },
        ];
        const breadcrumbs = [
          // {
          //   name: 'Меню 1',
          //   url: '#',
          // },
          // {
          //   name: 'Меню 2',
          //   url: '#',
          // },
        ];
        return (
          <main className="main">
            <PageHeadline breadcrumbs={breadcrumbs} title="Сводка" date={date} />
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
                  spendings={spendingsTodayList}
                  editSpending={editSpending}
                  addSpending={addSpending}
                />
                <Saldo graphData={toJS(saldoData)} />
              </div>
            </PageContainer>
          </main>
        );
      }
      return <OverviewPreloader />;
    })()

  );
});

export default Overview;
