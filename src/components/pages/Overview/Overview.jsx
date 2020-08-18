import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import * as moment from 'moment';
import PageContainer from '../../../hocs/PageContainer/PageContainer';
import PageTitle from '../../PageTitle/PageTitle';
import CardSpending from '../../CardSpending/CardSpending';
import styles from './Overview.module.scss';
import { useStore } from '../../../store/StoreContext';

const Overview = observer(() => {
  const store = useStore();
  const { getOverviewData } = store;
  useEffect(() => {
    getOverviewData();
  }, []);
  const {
    income,
    fixedCosts,
    savingPercent,
    spendings,
    dayBudjet,
    daySpendings,
    savingSum,
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
  const { cardWrapper } = styles;
  return (
    <main className="main">
      <PageContainer>
        <PageTitle title="Сводка" />
        <div className={cardWrapper}>
          {cards.map((card) => <CardSpending key={card.id} content={card} />)}
        </div>
      </PageContainer>
    </main>
  );
});

export default Overview;
