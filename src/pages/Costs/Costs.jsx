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

import { getCostsData } from '../../store/action-creator';
import dictionary from '../../utils/dictionary';

const Costs = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const costsData = useSelector((state) => state.costs.data);

  useEffect(() => {
    if (isEmpty(date) || isEmpty(costsData)) {
      dispatch(getCostsData());
    }
  }, []);

  return (
    (() => {
      if (!isEmpty(costsData)) {
        const {
          costsCurrentMonthSum,
          costsCurrentMonthList,
        } = costsData;
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
              <div className="row">
                <div className="col-lg-8">
                  <DataInputList
                    listType={dictionary.DATA_LIST_TYPE_COSTS}
                    title="Добавленные постоянные расходы"
                    date={date}
                    sum={costsCurrentMonthSum}
                    data={costsCurrentMonthList}
                    updateDataList={() => {}}
                  />
                </div>
                <div className="col-lg-4">
                  <DataPieChart title="Структура постоянных расходов" graphData={costsCurrentMonthList} />
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

export default Costs;
