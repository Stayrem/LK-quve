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
  fetchIncomes,
  addIncome,
  deleteIncome,
  editIncome,
  resetStore,
} from '../../store/action-creator';

const Incomes = () => {
  const dispatch = useDispatch();
  const isFetchFailed = useSelector((state) => state.fetchError);
  const date = useSelector((state) => state.date);
  const incomesCurrentMonthSum = useSelector((state) => state.incomesSum);
  const incomesCurrentMonthList = useSelector((state) => state.incomes);

  useEffect(() => {
    dispatch(fetchIncomes());
    document.title = `Доходы | ${dictionary.APP_NAME}`;
    return () => dispatch(resetStore());
  }, []);

  const breadcrumbs = [
    {
      name: 'Доходы',
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
          <PageHeadline breadcrumbs={breadcrumbs} title="Доходы" date={date * 1000} />
          <PageContainer>
            <PageText text="Введите все Ваши источники дохода за месяц." />
            <div className="row">
              <div className="col-lg-8 mb-3 mb-lg-0">
                <DataInputList
                  title="Добавленные доходы"
                  date={date * 1000}
                  sum={incomesCurrentMonthSum}
                  data={incomesCurrentMonthList}
                  onAdd={() => dispatch(addIncome())}
                  onDelete={(id) => dispatch(deleteIncome(id))}
                  onEdit={(incomeItem) => dispatch(editIncome(incomeItem))}
                />
              </div>
              <div className="col-lg-4">
                <DataPieChart title="Структура постоянных доходов" graphData={incomesCurrentMonthList} />
              </div>
            </div>
          </PageContainer>
        </main>
      );
    })()
  );
};

export default Incomes;
