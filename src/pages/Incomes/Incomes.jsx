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
import Tooltip from '../../components/Tooltip/Tooltip';
import { useAuth } from '../../hooks/use-auth';

const Incomes = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const isFetchFailed = useSelector((state) => state.fetchError);
  const date = useSelector((state) => state.date);
  const currentIncomesSum = useSelector((state) => state.currentIncomesSum);
  const currentIncomes = useSelector((state) => state.currentIncomes);

  useEffect(() => {
    dispatch(fetchIncomes(auth.user));
    document.title = `Доходы — ${dictionary.APP_NAME}`;
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
          <PageContainer>
            <PageHeadline breadcrumbs={breadcrumbs} title="Доходы" date={date} MonthFormat />
          </PageContainer>
          <PageContainer>
            <PageText text="Введите все Ваши источники дохода за месяц." />
            <div className="row">
              <div className="col-lg-8 mb-3 mb-lg-0">
                <DataInputList
                  title="Добавленные доходы"
                  date={date}
                  subtitle={(
                    <Tooltip
                      text="Сюда необходимо ввести все Ваши месячные доходы."
                      id="incomes"
                    />
                  )}
                  sum={currentIncomesSum}
                  data={currentIncomes}
                  useStatus={false}
                  onAdd={() => dispatch(addIncome())}
                  onDelete={(id) => dispatch(deleteIncome(id, auth.user))}
                  onEdit={(incomeItem) => dispatch(editIncome(incomeItem, auth.user))}
                />
              </div>
              <div className="col-lg-4">
                <DataPieChart title="Структура постоянных доходов" graphData={currentIncomes} />
              </div>
            </div>
          </PageContainer>
        </main>
      );
    })()
  );
};

export default Incomes;
