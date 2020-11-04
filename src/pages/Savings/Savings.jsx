import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import { useStore } from '../../store/StoreContext';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataBarChart from '../../components/DataBarChart/DataBarChart';
import SavingsAdjuster from '../../components/SavingsAdjuster/SavingsAdjuster';
import SavingsSum from '../../components/SavingsSum/SavingsSum';

const Savings = observer(() => {
  const store = useStore();
  const { getSavingsData } = store;
  useEffect(() => {
    getSavingsData();
  }, []);
  const {
    date,
    isSavingsDataFetched,
    incomesSum,
    savingsList,
    savingsSum,
    savingsCurrent,
    updateDataList,
  } = store;
  return (
    (() => {
      if (isSavingsDataFetched) {
        const breadcrumbs = [
          {
            name: 'Сбережения',
            url: '#',
          },
        ];
        return (
          <main className="main">
            <PageHeadline breadcrumbs={breadcrumbs} title="Сбережения" date={date} />
            <PageContainer>
              <div className="row">
                <div className="col">
                  <PageText text="Вы можете указать величину желаемых сбережений за месяц. На основе данной величины будет рассчитана итоговая сумма, которую можно потратить за день." />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-3 mb-lg-0">
                  <SavingsAdjuster date={moment(date).format('MMMM YYYY')} incomesSum={incomesSum} savingsCurrent={savingsCurrent} />
                  <SavingsSum value={savingsSum} />
                </div>
                <div className="col-lg-7">
                  <DataBarChart title="Динамика сбережений по месяцам" graphData={savingsList} />
                </div>
              </div>
            </PageContainer>
          </main>
        );
      }
      return <OverviewPreloader />;
    })()

  );
});

export default Savings;
