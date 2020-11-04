import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './DataInputList.module.scss';
import DataInputListItem from './DataInputListItem';

const DataInputList = (props) => {
  const {
    date,
    listType,
    sum,
    data,
    title,
    useStatus,
    updateDataList,
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
  const tbody = useRef(null);
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
    updateDataList(listType, 'add', null);
    setFocusToItem(data[data.length - 1].id, 'first');
  });
  const deleteInputListItemHandler = ((id) => {
    const currentIndex = data.findIndex((item) => item.id === id);
    const prevIndex = currentIndex - 1;
    const mutableItem = data[currentIndex];
    if (data.length > 1) {
      updateDataList(listType, 'delete', mutableItem);
      if (currentIndex !== 0) {
        setFocusToItem(data[prevIndex].id, 'last');
      } else {
        setFocusToItem(data[currentIndex].id, 'last');
      }
    } else {
      const editedItem = {
        id: mutableItem.id,
        name: '',
        value: '',
        status: true,
      };
      updateDataList(listType, 'edit', editedItem);
      setFocusToItem(editedItem.id, 'first');
    }
  });
  const editInputListItemHandler = ((editedItem) => {
    updateDataList(listType, 'edit', editedItem);
  });
  const outerAreaClick = ((event) => {
    const { target } = event;
    event.preventDefault();
    if (!tbody.current.contains(target)) setFocusToItem(-1, 'none');
  });

  useEffect(() => {
    document.addEventListener('click', outerAreaClick);
    return () => {
      document.removeEventListener('click', outerAreaClick);
    };
  }, []);

  return (
    <div className={dataInputList}>
      <div className={dataInputListHeader}>
        <div className={dataInputListHeaderTitle}>
          {title}
        </div>
        <div className={dataInputListHeaderDate}>
          {moment(date).format('MMMM YYYY')}
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
                {useStatus && <th>Статус</th>}
                <th>&nbsp;</th>
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
            <tbody ref={tbody}>
              { data.map((item, i) => (
                <DataInputListItem
                  key={item.id}
                  index={i}
                  id={item.id}
                  name={item.name}
                  value={item.value}
                  status={item.status}
                  isFocused={item.id === focusedRowId}
                  focusedInputType={focusedInputType}
                  isLast={item.id === data[data.length - 1].id}
                  useStatus={useStatus}
                  addInputListItem={addInputListItemHandler}
                  deleteInputListItem={deleteInputListItemHandler}
                  editInputListItem={editInputListItemHandler}
                  setFocusToItem={setFocusToItem}
                />
              )) }
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

DataInputList.defaultProps = {
  useStatus: true,
};

DataInputList.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  listType: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  useStatus: PropTypes.bool,
  updateDataList: PropTypes.func.isRequired,
};

export default DataInputList;
