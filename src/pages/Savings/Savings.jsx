import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dictionary from '@utils/dictionary';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataBarChart from '../../components/DataBarChart/DataBarChart';
import SavingsAdjuster from '../../components/SavingsAdjuster/SavingsAdjuster';
import SavingsSum from '../../components/SavingsSum/SavingsSum';
import {
  fetchSavings,
  fetchIncomes,
} from '../../store/action-creator';

const Savings = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const isDateChanged = useSelector((state) => state.isDateChanged);
  const currentYearSavings = useSelector((state) => state.currentYearSavings);
  const currentSavings = useSelector((state) => state.currentSavings);
  const currentYearSavingsSum = currentYearSavings.reduce((acc, curr) => acc + curr.value, 0);
  const currentIncomesSum = useSelector((state) => state.currentIncomesSum);
  const isSavingsFetched = useSelector((state) => state.isSavingsFetched);
  const isIncomesFethed = useSelector((state) => state.isIncomesFethed);

  const isDataFetched = [isSavingsFetched, isIncomesFethed]
    .every((isDataTypeFethed) => isDataTypeFethed === true);

  useEffect(() => {
    dispatch(fetchSavings());
    dispatch(fetchIncomes());
    document.title = `Сбережения — ${dictionary.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (isDateChanged) {
      dispatch(fetchSavings());
      dispatch(fetchIncomes());
    }
  }, [isDateChanged]);

  const breadcrumbs = [
    {
      name: 'Сбережения',
      url: '#',
    },
  ];

  return (
    (() => (
      <main className="main">
        <PageContainer>
          <PageHeadline breadcrumbs={breadcrumbs} title="Сбережения" date={date} MonthFormat />
        </PageContainer>
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
                currentIncomesSum={currentIncomesSum}
                currentSavings={currentSavings}
                isDataFetched={isDataFetched}
              />
              <SavingsSum value={currentYearSavingsSum} />
            </div>
            <div className="col-lg-7">
              <DataBarChart title="Динамика сбережений по месяцам" graphData={currentYearSavings} />
            </div>
          </div>
        </PageContainer>
      </main>
    ))()
  );
};

export default Savings;
