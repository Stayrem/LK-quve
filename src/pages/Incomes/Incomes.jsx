import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getTotalIncomes } from '../../store/action-creator';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import styles from './Incomes.module.scss';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';
import dictionary from '../../utils/dictionary';

const Incomes = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.incomes.date);
  const incomesList = useSelector((state) => state.incomes.incomesList);
  const overviewData = useSelector((state) => state.overview.data);
  useEffect(() => {
    if (incomesList.length === 0) {
      dispatch(getTotalIncomes());
    }
  }, []);
  const { incomesSum } = overviewData;
  const {
    inner,
  } = styles;
  return (
    (() => {
      if (incomesList.length > 0) {
        const breadcrumbs = [
          {
            name: 'Доходы',
            url: '#',
          },
        ];
        return (
          <main className="main">
            <PageHeadline breadcrumbs={breadcrumbs} title="Доходы" date={moment.unix(date).utc()} />
            <PageContainer>
              <PageText text="Введите все Ваши источники дохода за месяц." />
              <div className={inner}>
                <div className="flex-70">
                  {/*
                  <DataInputList
                    listType={dictionary.DATA_LIST_TYPE_INCOMES}
                    title="Добавленные доходы"
                    date={moment(date).format('MMMM YYYY')}
                    sum={incomesSum}
                    data={incomesList}
                  />*/}
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
};

export default Incomes;
