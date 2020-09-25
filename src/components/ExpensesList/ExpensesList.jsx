/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './ExpensesList.module.scss';
import inputTypesDict from './inputTypesDict';
import { removeItem, addItem, keyDownHandler } from './utils/listController';

// TODO убрать функции добавления и удаленияэлементов
// списка из хранилища и перенести их в /utils на уровень компонента.
// Это позволит сделать компонент более абстрактным и улучшит переиспользованность
const ExpensesList = (props) => {
  const {
    spendings,
    editSpending,
    updateSpending,
  } = props;

  const {
    expenses,
    expensesTitle,
    expensesListInput,
    expensesListItem,
    expensesListButton,
    focus,
    addExpenseButton,
    removeBtn,
    expensesListInputTitle,
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

  const JSSpendings = toJS(spendings);

  const lastItem = useRef(null);

  const [focusedId, focusItem] = useState(-1);

  const keyEventsWrapper = (list, evt, type, id, ref) => {
    updateSpending(keyDownHandler(list, evt, type, id, ref));
  };

  return (
    <div className={expenses}>
      <p className={expensesTitle}>Список трат за сегодня</p>
      <ul className="expensesList">
        <li className={expensesListItem}>
          <input type="text" value="Категория" disabled className={[expensesListInput, expensesListInputTitle].join(' ')} />
          <input type="text" value="Сумма" disabled className={[expensesListInput, expensesListInputTitle].join(' ')} />

        </li>
        {spendings.map((item) => {
          const focusClassname = focusedId === item.id ? focus : '';
          return (
            <li key={item.id} className={expensesListItem}>
              <div type="button" className={[expensesListButton, focusClassname, 's_button'].join(' ')} onClick={() => focusItem(item.id)}>
                <input
                  ref={lastItem}
                  onFocus={() => focusItem(item.id)}
                  onKeyDown={(evt) => {
                    keyEventsWrapper(JSSpendings, evt, inputTypesDict.category, item.id, lastItem);
                  }}
                  autoFocus
                  className={expensesListInput}
                  placeholder="Категория"
                  onChange={(evt) => onChangeHanler(inputTypesDict.category, item.id, evt)}
                  type="text"
                  defaultValue={item.category}
                />
                <input
                  onFocus={() => focusItem(item.id)}
                  onKeyDown={(evt) => {
                    keyEventsWrapper(JSSpendings, evt, inputTypesDict.category, item.id, lastItem);
                  }}
                  className={expensesListInput}
                  placeholder="Сумма"
                  onChange={(evt) => onChangeHanler(inputTypesDict.value, item.id, evt)}
                  type="number"
                  defaultValue={item.value}
                />
                <button className={['s_button', removeBtn].join(' ')} type="button" onClick={() => updateSpending(removeItem(JSSpendings, item.id))}>
                  <FontAwesomeIcon icon={faTimesCircle} color="#ffffff" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button className={['s_button', addExpenseButton].join(' ')} type="button" onClick={() => updateSpending(addItem(JSSpendings))}>Добавить строчку</button>
    </div>
  );
};

ExpensesList.propTypes = {
  spendings: PropTypes.arrayOf(PropTypes.object).isRequired,
  editSpending: PropTypes.func.isRequired,
  updateSpending: PropTypes.func.isRequired,
};

export default ExpensesList;
