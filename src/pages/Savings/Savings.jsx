import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from 'lodash/isEmpty';
import dictionary from '@utils/dictionary';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataBarChart from '../../components/DataBarChart/DataBarChart';
import SavingsAdjuster from '../../components/SavingsAdjuster/SavingsAdjuster';
import SavingsSum from '../../components/SavingsSum/SavingsSum';
import {
  getDateData,
  getIncomesData,
  getSavingsData,
  getHistoryData,
} from '../../store/action-creator';

const Savings = () => {

  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const savingsCurrentMonthSum = useSelector((state) => state.savings.savingsCurrentMonthSum);
  const savingsCurrentYearSum = useSelector((state) => state.history.savingsCurrentYearSum);
  const savingsCurrentYearList = useSelector((state) => state.history.savingsCurrentYearList);
  const incomesCurrentMonthSum = useSelector((state) => state.incomes.incomesCurrentMonthSum);

  useEffect(() => {
    (async () => {
      if (!date) {
        await dispatch(getDateData());
      }
      if (!savingsCurrentMonthSum) {
        await dispatch(getSavingsData());
      }
      if (!savingsCurrentYearSum || isEmpty(savingsCurrentYearList)) {
        await dispatch(getHistoryData(dictionary.HISTORY_TYPE_SAVINGS));
      }
      if (!incomesCurrentMonthSum) {
        await dispatch(getIncomesData());
      }
    })();
  }, []);

  useEffect(() => {
    document.title = `Сбережения | ${dictionary.APP_NAME}`;
  }, []);

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
            <SavingsAdjuster date={date} incomesCurrentMonthSum={incomesCurrentMonthSum} savingsCurrentMonthSum={savingsCurrentMonthSum} />
            <SavingsSum value={savingsCurrentYearSum} />
          </div>
          <div className="col-lg-7">
            <DataBarChart title="Динамика сбережений по месяцам" graphData={savingsCurrentYearList} />
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default Savings;
