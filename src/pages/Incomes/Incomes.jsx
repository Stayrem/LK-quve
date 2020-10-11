import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import styles from './Incomes.module.scss';
import { useStore } from '../../store/StoreContext';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';
import dictionary from '../../utils/dictionary';

const Incomes = observer(() => {
  const store = useStore();
  const { getInputData } = store;
  useEffect(() => {
    getInputData();
  }, []);
  const {
    date,
    isInputDataFetched,
    incomesSum,
    incomesList,
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
            name: 'Доходы',
            url: '#',
          },
        ];
        return (
          <main className="main">
            <PageHeadline breadcrumbs={breadcrumbs} title="Доходы" date={date} />
            <PageContainer>
              <PageText text="Введите все Ваши источники дохода за месяц." />
              <div className={inner}>
                <div className="flex-70">
                  <DataInputList
                    listType={dictionary.DATA_LIST_TYPE_INCOMES}
                    title="Добавленные доходы"
                    date={moment(date).format('MMMM YYYY')}
                    sum={incomesSum}
                    data={incomesList}
                    updateDataList={updateDataList}
                  />
                </div>
                <div className="flex-30">
                  <DataPieChart graphData={incomesList} />
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

export default Incomes;
