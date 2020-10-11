import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import styles from './Costs.module.scss';
import { useStore } from '../../store/StoreContext';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';
import dictionary from '../../utils/dictionary';

const Costs = observer(() => {
  const store = useStore();
  const { getInputData } = store;
  useEffect(() => {
    getInputData();
  }, []);
  const {
    date,
    isInputDataFetched,
    costsList,
    costsSum,
    updateDataList,
  } = store;
  const {
    inner,
  } = styles;
  return (
    (() => {
      if (isInputDataFetched) {
        const breadcrumbs = [
          {
            name: 'Постоянные расходы',
            url: '#',
          },
        ];
        return (
          <main className="main">
            <PageHeadline breadcrumbs={breadcrumbs} title="Постоянные расходы" date={date} />
            <PageContainer>
              <PageText text="Введите все Ваши постоянные расходы за месяц." />
              <div className={inner}>
                <div className="flex-70">
                  <DataInputList
                    listType={dictionary.DATA_LIST_TYPE_COSTS}
                    title="Добавленные постоянные расходы"
                    date={moment(date).format('MMMM YYYY')}
                    sum={costsSum}
                    data={costsList}
                    updateDataList={updateDataList}
                  />
                </div>
                <div className="flex-30">
                  <DataPieChart graphData={costsList} />
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

export default Costs;
