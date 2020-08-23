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
    isOverwiewDataFetched,
    isSaldoDataFetched,
    dayBudjet,
    daySpendings,
    savingSum,
    spendings,
    editSpending,
    addSpending,
    saldoData,
  } = store;

  const today = moment().format('DD MMMM YYYY');
  const mounth = moment().format('MMMM');
  const cards = [
    {
      id: 0,
      title: 'Траты за сегодня',
      text: daySpendings,
      textcolor: (dayBudjet - daySpendings) > 0 ? '#7DC900' : 'red',
      subTitle: `Осталось: ${dayBudjet - daySpendings}`,
    },
    {
      id: 1,
      title: 'Бюджет на день',
      text: dayBudjet,
      textcolor: '#7DC900',
      subTitle: today,
    },
    {
      id: 2,
      title: 'Сбережения',
      text: savingSum,
      textcolor: '#ffffff',
      subTitle: mounth,
    },
    {
      id: 3,
      title: 'Сбережения',
      text: savingSum,
      textcolor: '#ffffff',
      subTitle: mounth,
    },
  ];
  const { cardWrapper, inner } = styles;
  return (
    <main className="main">
      <PageContainer>
        <PageTitle title="Сводка" />
        <div className={cardWrapper}>
          {cards.map((card) => <Card key={card.id} content={card} />)}
        </div>
        <div className={inner}>
          <ExpensesList
            spendings={spendings}
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
