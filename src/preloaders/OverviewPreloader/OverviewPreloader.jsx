import React from 'react';
import { observer } from 'mobx-react-lite';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageTitle from '../../components/PageTitle/PageTitle';
import ExpensesListPreloader from '../ExpensesListPreloader/ExpensesListPreloader';
import CardPreloader from '../CardPreloader/CardPreloader';
import SaldoPreloader from '../SaldoPreloader/SaldoPreloader';
import styles from '../../pages/Overview/Overview.module.scss';

const OverviewPreloader = observer(() => {
  const {
    cardElippser, cardScroller, cardWrapper, inner,
  } = styles;
  return (
    <main className="main">
      <PageContainer>
        <PageTitle title="Сводка" />
        <div className={cardElippser}>
          <div className={cardScroller}>
            <div className={cardWrapper}>
              <CardPreloader />
              <CardPreloader />
              <CardPreloader />
              <CardPreloader />
            </div>
          </div>
        </div>
        <div className={inner}>
          <ExpensesListPreloader />
          <SaldoPreloader />
        </div>
      </PageContainer>
    </main>
  );
});

export default OverviewPreloader;
