import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import styles from './ExpensesList.module.scss';

const ExpensesList = (props) => {
  const { spendings, editSpending, addSpending } = props;
  const {
    expenses,
    expensesTitle,
    expensesListInput,
    expensesListItem,
    expensesListButton,
    focus,
    addExpenseButton,
  } = styles;
  const onChangeHanler = (type, id, evt) => {
    const text = evt.target.value;
    let find;
    const isNew = () => {
      find = toJS(spendings).find((item) => item.id === id);
      return find === undefined;
    };
    const content = type === 'value' ? { value: text === '' ? 0 : text } : { category: text };
    if (isNew()) {
      editSpending(
        {
          id: spendings.length,
          ...content,
        },
      );
    } else {
      editSpending({
        ...find,
        ...content,
      });
    }
  };

  const [focusedId, focusItem] = useState(-1);

  return (
    <div className={expenses}>
      <p className={expensesTitle}>Список трат за сегодня</p>
      <ul className="expensesList">
        {spendings.map((item) => {
          const focusClassname = focusedId === item.id ? focus : '';
          return (
            <li key={item.id} className={expensesListItem}>
              <button type="button" className={[expensesListButton, focusClassname, 's_button'].join(' ')} onClick={() => focusItem(item.id)}>
                <input className={expensesListInput} placeholder="Категория" onChange={(evt) => onChangeHanler('category', item.id, evt)} type="text" defaultValue={item.category} />
                <input className={expensesListInput} placeholder="Сумма" onChange={(evt) => onChangeHanler('value', item.id, evt)} type="number" defaultValue={item.value} />
              </button>
            </li>
          );
        })}
      </ul>
      <button className={['s_button', addExpenseButton].join(' ')} type="button" onClick={() => addSpending()}>Добавить строчку</button>
    </div>
  );
};

ExpensesList.propTypes = {
  spendings: PropTypes.arrayOf(PropTypes.object).isRequired,
  editSpending: PropTypes.func.isRequired,
  addSpending: PropTypes.func.isRequired,
};

export default ExpensesList;
