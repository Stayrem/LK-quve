import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import styles from './ExpensesList.module.scss';

const ExpensesList = (props) => {
  const { spendings, editSpending, addSpending } = props;
  const {
    expences,
    expencesTitle,
    expencesListInput,
    expencesListItem,
    expencesListButton,
    focus,
    addSpendingButton,
  } = styles;
  const onChangeHanler = (type, id, evt) => {
    const text = evt.target.value;
    let find;
    const isNew = () => {
      find = toJS(spendings).find((item) => item.id === id);
      return find === undefined;
    };
    const content = type === 'value' ? { value: text } : { categorie: text };
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
    <div className={expences}>
      <p className={expencesTitle}>Список трат за сегодня</p>
      <ul className="expencesList">
        {spendings.map((item) => {
          const focusClassname = focusedId === item.id ? focus : '';
          return (
            <li key={item.id} className={expencesListItem}>
              <button type="button" className={[expencesListButton, focusClassname, 's_button'].join(' ')} onClick={() => focusItem(item.id)}>
                <input className={expencesListInput} placeholder="Категория" onChange={(evt) => onChangeHanler('categorie', item.id, evt)} type="text" defaultValue={item.categorie} />
                <input className={expencesListInput} placeholder="Сумма" onChange={(evt) => onChangeHanler('value', item.id, evt)} type="text" defaultValue={item.value} />
              </button>
            </li>
          );
        })}
      </ul>
      <button className={['s_button', addSpendingButton].join(' ')} type="button" onClick={() => addSpending()}>Добавить строчку</button>
    </div>
  );
};

ExpensesList.propTypes = {
  spendings: PropTypes.arrayOf(PropTypes.object).isRequired,
  editSpending: PropTypes.func.isRequired,
  addSpending: PropTypes.func.isRequired,
};

export default ExpensesList;
