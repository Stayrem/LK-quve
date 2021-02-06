import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dictionary from '../../utils/dictionary';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';

import {
  fetchCosts,
  addCost,
  deleteCost,
  editCost,
} from '../../store/action-creator';
import Tooltip from '../../components/Tooltip/Tooltip';

const Costs = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const isDateChanged = useSelector((state) => state.isDateChanged);
  const currentCostsSum = useSelector((state) => state.currentCostsSum);
  const currentCosts = useSelector((state) => state.currentCosts);
  const isCostsFetched = useSelector((state) => state.isCostsFetched);

  useEffect(() => {
    dispatch(fetchCosts());
    document.title = `Постоянные расходы — ${dictionary.APP_NAME}`;
  }, []);

  useEffect(() => {
    if (isDateChanged) {
      dispatch(fetchCosts());
    }
  }, [isDateChanged]);

  const breadcrumbs = [
    {
      name: 'Постоянные расходы',
      url: '#',
    },
  ];

  return (
    (() => (
      <main className="main">
        <PageContainer>
          <PageHeadline breadcrumbs={breadcrumbs} title="Постоянные расходы" date={date} MonthFormat />
        </PageContainer>
        <PageContainer>
          <PageText text="Введите все Ваши постоянные расходы за месяц." />
          <div className="row">
            <div className="col-lg-8">
              <DataInputList
                title="Добавленные постоянные расходы"
                date={date}
                subtitle={(
                  <Tooltip
                    text="Сюда необходимо ввести все Ваши постоянные месячные расходы."
                    id="costs"
                  />
                )}
                sum={currentCostsSum}
                data={currentCosts}
                useStatus={false}
                onAdd={() => dispatch(addCost())}
                onDelete={(id) => dispatch(deleteCost(id))}
                onEdit={(costItem) => dispatch(editCost(costItem))}
                isDataFetched={isCostsFetched}
              />
            </div>
            <div className="col-lg-4">
              <DataPieChart title="Структура постоянных расходов" graphData={currentCosts} />
            </div>
          </div>
        </PageContainer>
      </main>
    ))()
  );
};

export default Costs;
