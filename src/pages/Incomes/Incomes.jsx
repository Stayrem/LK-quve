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
  getDateData,
  getIncomesData,
} from '../../store/action-creator';
import dictionary from '../../utils/dictionary';

const Incomes = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const incomesCurrentMonthSum = useSelector((state) => state.incomes.incomesCurrentMonthSum);
  const incomesCurrentMonthList = useSelector((state) => state.incomes.incomesCurrentMonthList);

  useEffect(() => {
    (async () => {
      if (!date) {
        await dispatch(getDateData());
      }
      if (!incomesCurrentMonthSum || isEmpty(incomesCurrentMonthList)) {
        await dispatch(getIncomesData());
      }
      setIsDataFetched(true);
    })();
  }, []);

  return (
    (() => {
      if (isDataFetched) {
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
