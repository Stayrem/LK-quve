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
  const [focusedInputType, setFocusedInputType] = useState(null);
  const setFocusToItem = ((itemId, inputType, neighbour) => {
    let id;
    if (neighbour === 'next') {
      const nextIndex = data.findIndex((item) => item.id === itemId) + 1;
      id = data[nextIndex].id;
    } else if (neighbour === 'prev') {
      const nextIndex = data.findIndex((item) => item.id === itemId) - 1;
      id = data[nextIndex].id;
    } else {
      id = itemId;
    }
    setFocusedRowId(id);
    setFocusedInputType(inputType);
  });
  const addInputListItemHandler = (() => {
    addInputListItem(type);
    setFocusToItem(data[data.length - 1].id, 'first');
  });
  const deleteInputListItemHandler = ((id) => {
    const prevIndex = data.findIndex((item) => item.id === id) - 1;
    if (data.length > 1) {
      deleteInputListItem(type, id);
      setFocusToItem(data[prevIndex].id, 'last');
    } else {
      const editedItem = {
        id,
        name: '',
        value: '',
        status: true,
      };
      editInputListItem(type, editedItem);
      setFocusToItem(editedItem.id, 'first');
    }
  });

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
                  <button className={addRowButton} type="button" onClick={() => addInputListItemHandler()}>
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
              focusedInputType={focusedInputType}
              isLast={item.id === data[data.length - 1].id}
              deleteInputListItem={deleteInputListItemHandler}
              editInputListItem={editInputListItem}
              addInputListItem={addInputListItemHandler}
              setFocusToItem={setFocusToItem}
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
