import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import * as moment from 'moment';
import { toJS } from 'mobx';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageTitle from '../../components/PageTitle/PageTitle';
import Card from '../../components/Card/Card';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import styles from './Overview.module.scss';
import { useStore } from '../../store/StoreContext';
import Saldo from '../../components/Saldo/Saldo';

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

    spendingsLastSum,
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

  const today = moment(date).format('DD MMMM YYYY');
  const month = moment(date).format('MMMM');
  const cards = [
    {
      id: 0,
      title: 'Траты за сегодня',
      text: spendingsTodaySum,
      textcolor: (budgetToday - spendingsTodaySum) > 0 ? '#7DC900' : '#FC4349',
      subTitle: `Осталось: ${budgetToday - spendingsTodaySum}`,
    },
    {
      id: 1,
      title: 'Бюджет на день',
      text: budgetToday,
      textcolor: budgetToday > 0 ? '#7DC900' : '#FC4349',
      subTitle: today,
    },
    {
      id: 2,
      title: 'Сбережения',
      text: savingSum,
      textcolor: '#ffffff',
      subTitle: `на ${month}`,
    },
    {
      id: 3,
      title: 'Остаток до конца месяца',
      text: restSum,
      textcolor: '#ffffff',
      subTitle: `${restPercent} %`,
    },
  ];
  const { cardElippser, cardScroller, cardWrapper, inner } = styles;
  return (
    <main className="main">
      <PageContainer>
        <PageTitle title="Сводка" />
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
          {(() => {
            if (isSaldoDataFetched) {
              return (
                <Saldo graphData={toJS(saldoData)} />
              );
            }
            return null;
          })()}
        </div>
      </PageContainer>
    </main>
  );
});

export default Overview;
