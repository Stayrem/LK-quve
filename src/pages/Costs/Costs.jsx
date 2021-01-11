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

const Costs = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);
  const costsCurrentMonthSum = useSelector((state) => state.costsSum);
  const costsCurrentMonthList = useSelector((state) => state.costs);

  useEffect(() => {
    dispatch(fetchCosts());
    document.title = `Постоянные расходы | ${dictionary.APP_NAME}`;
  }, []);

  const breadcrumbs = [
    {
      name: 'Постоянные расходы',
      url: '#',
    },
  ];

  return (
    <main className="main">
      <PageHeadline breadcrumbs={breadcrumbs} title="Постоянные расходы" date={date * 1000} />
      <PageContainer>
        <PageText text="Введите все Ваши постоянные расходы за месяц." />
        <div className="row">
          <div className="col-lg-8">
            <DataInputList
              title="Добавленные постоянные расходы"
              date={date * 1000}
              sum={costsCurrentMonthSum}
              data={costsCurrentMonthList}
              onAdd={() => dispatch(addCost())}
              onDelete={(id) => dispatch(deleteCost(id))}
              onEdit={(costItem) => dispatch(editCost(costItem))}
            />
          </div>
          <div className="col-lg-4">
            <DataPieChart title="Структура постоянных расходов" graphData={costsCurrentMonthList} />
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default Costs;
