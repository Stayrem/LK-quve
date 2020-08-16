import React, { useEffect } from 'react';
import PageContainer from '../../../hocs/PageContainer/PageContainer';
import PageTitle from '../../PageTitle/PageTitle';
import CardSpending from '../../CardSpending/CardSpending';
import styles from './Overview.module.scss';
import { useStore } from '../../../store/StoreContext';

const Overview = () => {
  const store = useStore();
  const { getOverviewData } = store;
  useEffect(() => {
    getOverviewData();
  }, []);
  const { cardWrapper } = styles;
  return (
    <main className="main">
      <PageContainer>
        <PageTitle title="Сводка" />
        <div className={cardWrapper}>
          <CardSpending />
        </div>
      </PageContainer>
    </main>
  );
};

export default Overview;
