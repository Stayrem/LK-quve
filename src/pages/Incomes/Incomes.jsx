import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';

import { getIncomesData } from '../../store/action-creator';
import dictionary from '../../utils/dictionary';

const Incomes = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const incomesData = useSelector((state) => state.incomes.data);

  useEffect(() => {
    if (isEmpty(date) || isEmpty(incomesData)) {
      dispatch(getIncomesData());
    }
  }, []);

  return (
    (() => {
      if (!isEmpty(incomesData)) {
        const {
          incomesCurrentMonthSum,
          incomesCurrentMonthList,
        } = incomesData;
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
              <div className="row">
                <div className="col-lg-8">
                  <DataInputList
                    listType={dictionary.DATA_LIST_TYPE_INCOMES}
                    title="Добавленные доходы"
                    date={date}
                    sum={incomesCurrentMonthSum}
                    data={incomesCurrentMonthList}
                    updateDataList={() => {}}
                  />
                </div>
                <div className="col-lg-4">
                  <DataPieChart title="Структура постоянных доходов" graphData={incomesCurrentMonthList} />
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
