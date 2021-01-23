import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dictionary from '@utils/dictionary';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataBarChart from '../../components/DataBarChart/DataBarChart';
import SavingsAdjuster from '../../components/SavingsAdjuster/SavingsAdjuster';
import SavingsSum from '../../components/SavingsSum/SavingsSum';
import ErrorPage from '../ErrorPage/ErrorPage';
import {
  fetchSavings,
  fetchIncomes,
  resetStore,
} from '../../store/action-creator';

const Savings = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const isFetchFailed = useSelector((state) => state.fetchError);
  const savingsCurrentYearList = useSelector((state) => state.savings);
  const incomesCurrentMonthSum = useSelector((state) => state.incomesSum);
  const savingsCurrentMonth = useSelector((state) => state.savingsSelectedMonth);
  const savingsCurrentYearSum = savingsCurrentYearList
    .reduce((acc, curr) => acc + curr.value, 0);

  useEffect(() => {
    dispatch(fetchSavings());
    dispatch(fetchIncomes());
    document.title = `Сбережения — ${dictionary.APP_NAME}`;
    return () => dispatch(resetStore());
  }, []);

  const breadcrumbs = [
    {
      name: 'Сбережения',
      url: '#',
    },
  ];

  return (
    (() => {
      if (isFetchFailed) {
        return <ErrorPage code={500} message="Ошибка" />;
      }
      return (
        <main className="main">
          <PageHeadline breadcrumbs={breadcrumbs} title="Сбережения" date={date * 1000} />
          <PageContainer>
            <div className="row">
              <div className="col">
                <PageText text="Вы можете указать величину желаемых сбережений за месяц. На основе данной величины будет рассчитана итоговая сумма, которую можно потратить за день." />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <SavingsAdjuster
                  date={date}
                  incomesCurrentMonthSum={incomesCurrentMonthSum}
                  savingsCurrentMonthSum={savingsCurrentMonth.value}
                />
                <SavingsSum value={savingsCurrentYearSum} />
              </div>
              <div className="col-lg-7">
                <DataBarChart title="Динамика сбережений по месяцам" graphData={savingsCurrentYearList} />
              </div>
            </div>
          </PageContainer>
        </main>
      );
    })()
  );
};

export default Savings;
