/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import styles from './ExpensesList.module.scss';
import inputTypesDict from './inputTypesDict';

const ExpensesList = (props) => {
  const {
    spendings,
    editSpending,
    addSpending,
    removeSpending,
  } = props;

  const {
    expenses,
    expensesTitle,
    expensesListInput,
    expensesListItem,
    expensesListButton,
    focus,
    addExpenseButton,
  } = styles;

  useEffect(() => {
    document.activeElement.blur();
  }, []);

  const onChangeHanler = (type, id, evt) => {
    const text = evt.target.value;
    let find;
    const isNew = () => {
      find = toJS(spendings).find((item) => item.id === id);
      return find === undefined;
    };
    const content = type === 'value' ? { value: text === '' ? 0 : parseInt(text, 10) } : { category: text };
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

  const lastItem = useRef(null);

  const [focusedId, focusItem] = useState(-1);

  const keyDownHandler = (evt, type, id) => {
    if (evt.key === 'Enter' && type === inputTypesDict.value) {
      addSpending();
    }
    if (evt.key === 'Tab') {
      evt.target.focus();
    }
    if (evt.key === 'Delete' && type === inputTypesDict.category) {
      removeSpending(id);
      lastItem.current.focus();
    }
  };

  return (
    <div className={expenses}>
      <p className={expensesTitle}>Список трат за сегодня</p>
      <ul className="expensesList">
        {spendings.map((item) => {
          const focusClassname = focusedId === item.id ? focus : '';
          return (
            <li key={item.id} className={expensesListItem}>
              <div type="button" className={[expensesListButton, focusClassname, 's_button'].join(' ')} onClick={() => focusItem(item.id)}>
                <input
                  ref={lastItem}
                  onFocus={() => focusItem(item.id)}
                  onKeyDown={(evt) => keyDownHandler(evt, inputTypesDict.category, item.id)}
                  autoFocus
                  className={expensesListInput}
                  placeholder="Категория"
                  onChange={(evt) => onChangeHanler(inputTypesDict.category, item.id, evt)}
                  type="text"
                  defaultValue={item.category}
                />
                <input
                  onFocus={() => focusItem(item.id)}
                  onKeyDown={(evt) => keyDownHandler(evt, inputTypesDict.value, item.id)}
                  className={expensesListInput}
                  placeholder="Сумма"
                  onChange={(evt) => onChangeHanler(inputTypesDict.value, item.id, evt)}
                  type="number"
                  defaultValue={item.value}
                />
              </div>
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
  removeSpending: PropTypes.func.isRequired,
};

export default ExpensesList;
