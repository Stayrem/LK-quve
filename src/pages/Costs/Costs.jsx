import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import dictionary from '../../utils/dictionary';

import PageContainer from '../../hocs/PageContainer/PageContainer';
import PageHeadline from '../../layouts/PageHeadline/PageHeadline';
import PageText from '../../components/PageText/PageText';
import DataInputList from '../../components/DataInputList/DataInputList';
import DataPieChart from '../../components/DataPieChart/DataPieChart';
import ErrorPage from '../ErrorPage/ErrorPage';

import {
  fetchCosts,
  addCost,
  deleteCost,
  editCost,
  resetStore,
} from '../../store/action-creator';
import Tooltip from '../../components/Tooltip/Tooltip';
import { useAuth } from '../../hooks/use-auth';

const Costs = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const date = useSelector((state) => state.date);
  const isFetchFailed = useSelector((state) => state.fetchError);
  const currentCostsSum = useSelector((state) => state.currentCostsSum);
  const currentCosts = useSelector((state) => state.currentCosts);
  const isCostsFetched = useSelector((state) => state.isCostsFetched);

  useEffect(() => {
    dispatch(fetchCosts(auth.user));
    document.title = `Постоянные расходы — ${dictionary.APP_NAME}`;
    return () => dispatch(resetStore());
  }, []);

  const breadcrumbs = [
    {
      name: 'Постоянные расходы',
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
                  onDelete={(id) => dispatch(deleteCost(id, auth.user))}
                  onEdit={(costItem) => dispatch(editCost(costItem, auth.user))}
                  isDataFetched={isCostsFetched}
                />
              </div>
              <div className="col-lg-4">
                <DataPieChart title="Структура постоянных расходов" graphData={currentCosts} />
              </div>
            </div>
          </PageContainer>
        </main>
      );
    })()
  );
};

export default Costs;
