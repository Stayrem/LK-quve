import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './DataInputList.module.scss';
import DataInputListItem from './DataInputListItem';

const DataInputList = (props) => {
  const {
    type,
    sum,
    data,
    title,
    date,
    addInputListItem,
    deleteInputListItem,
    editInputListItem,
  } = props;
  const {
    dataInputList,
    dataInputListHeader,
    dataInputListHeaderTitle,
    dataInputListHeaderDate,
    dataInputListBody,
    dataInputListScroller,
    dataInputListTable,
    dataInputListFooter,
    dataInputListSum,
    addRowButton,
  } = styles;
  const [focusedRowId, setFocusedRowId] = useState(null);

  return (
    <div className={dataInputList}>
      <div className={dataInputListHeader}>
        <div className={dataInputListHeaderTitle}>
          {title}
        </div>
        <div className={dataInputListHeaderDate}>
          {date}
        </div>
      </div>
      <div className={dataInputListBody}>
        <div className={dataInputListScroller}>
          <table className={dataInputListTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Размер</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="5">
                  <button className={addRowButton} type="button" onClick={() => addInputListItem(type)}>
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Добавить строчку &nbsp;
                    <sub>↳ Enter</sub>
                  </button>
                </td>
              </tr>
            </tfoot>
            <tbody>
            { data.map((item) => (<DataInputListItem
              key={item.id}
              type={type}
              id={item.id}
              name={item.name}
              value={item.value}
              status={item.status}
              isFocused={item.id === focusedRowId}
              deleteInputListItem={deleteInputListItem}
              editInputListItem={editInputListItem}
              addInputListItem={addInputListItem}
            />)) }
            </tbody>
          </table>
        </div>
      </div>
      <div className={dataInputListFooter}>
        <div className={dataInputListSum}>
          Сумма:&nbsp;
          <span>{sum}</span>
        </div>
      </div>
    </div>
  );
};

DataInputList.propTypes = {
  type: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  addInputListItem: PropTypes.func.isRequired,
  deleteInputListItem: PropTypes.func.isRequired,
  editInputListItem: PropTypes.func.isRequired,
};

export default DataInputList;
