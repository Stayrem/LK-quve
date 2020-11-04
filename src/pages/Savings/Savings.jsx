import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataBarChart from '../../components/DataBarChart/DataBarChart';
import SavingsAdjuster from '../../components/SavingsAdjuster/SavingsAdjuster';
import SavingsSum from '../../components/SavingsSum/SavingsSum';
import { getSavingsData } from '../../store/action-creator';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';

const Savings = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const savingsData = useSelector((state) => state.savings.data);

  useEffect(() => {
    if (isEmpty(date) || isEmpty(savingsData)) {
      dispatch(getSavingsData());
    }
  }, []);

  return (
    (() => {
      if (!isEmpty(savingsData)) {
        const {
          incomesCurrentMonthSum,
          savingsCurrentYearList,
          savingsCurrentYearSum,
          savingsCurrentMonthSum,
        } = savingsData;
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
                  <SavingsAdjuster date={moment(date).format('MMMM YYYY')} incomesCurrentMonthSum={incomesCurrentMonthSum} savingsCurrentMonthSum={savingsCurrentMonthSum} />
                  <SavingsSum value={savingsCurrentYearSum} />
                </div>
                <div className="col-lg-7">
                  <DataBarChart title="Динамика сбережений по месяцам" graphData={savingsCurrentYearList} />
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

export default Savings;
