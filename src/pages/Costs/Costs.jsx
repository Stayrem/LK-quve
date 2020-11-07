import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';
import OverviewPreloader from '../../preloaders/OverviewPreloader/OverviewPreloader';

import {
  getCostsData,
  getDateData,
} from '../../store/action-creator';
import dictionary from '../../utils/dictionary';

const Costs = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const costsCurrentMonthSum = useSelector((state) => state.costs.costsCurrentMonthSum);
  const costsCurrentMonthList = useSelector((state) => state.costs.costsCurrentMonthList);

  useEffect(() => {
    (async () => {
      if (!date) {
        await dispatch(getDateData());
      }
      if (!costsCurrentMonthSum || isEmpty(costsCurrentMonthList)) {
        await dispatch(getCostsData());
      }
      setIsDataFetched(true);
    })();
  }, []);

  return (
    (() => {
      if (isDataFetched) {
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
