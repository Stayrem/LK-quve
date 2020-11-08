import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import moment from 'moment';

import { nanoid } from 'nanoid';
import { MAX_ID_LENGTH } from '@utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { getSumByArray } from '@utils/functions';
import dictionary from '@utils/dictionary';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import DataInputListItem from './DataInputListItem';
import styles from './DataInputList.module.scss';
import { updateCostsData, updateIncomesData, updateSpendingsData } from '../../store/action-creator';

const DataInputList = (props) => {
  const dispatch = useDispatch();

  const {
    date,
    listType,
    sum,
    data,
    title,
    useStatus,
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

  const updateDataList = (newData) => {
    switch (listType) {
      case dictionary.DATA_LIST_TYPE_INCOMES:
        dispatch(updateIncomesData(newData));
        break;
      case dictionary.DATA_LIST_TYPE_COSTS:
        dispatch(updateCostsData(newData));
        break;
      case dictionary.DATA_LIST_TYPE_SPENDINGS:
        dispatch(updateSpendingsData(newData));
        break;
      default:
        break;
    }
  };

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
    const lastItem = data[data.length - 1];
    if (lastItem.name || lastItem.value) {
      const newList = data;
      newList.push({
        id: nanoid(MAX_ID_LENGTH),
        name: '',
        value: '',
        status: true,
      });
      const newSum = getSumByArray(newList);
      updateDataList(
        {
          newSum,
          newList,
        },
      );
      setFocusToItem(data[data.length - 1].id, 'first');
    }
  });

  const editInputListItemHandler = ((editedItem) => {
    const newList = data;
    const indexOfEditedItem = newList.findIndex((item) => item.id === editedItem.id);

    newList[indexOfEditedItem] = editedItem;
    const newSum = getSumByArray(newList);
    updateDataList(
      {
        newSum,
        newList,
      },
    );
  });

  const deleteInputListItemHandler = ((id) => {
    const currentIndex = data.findIndex((item) => item.id === id);
    const prevIndex = currentIndex - 1;
    const mutableItem = data[currentIndex];
    const newList = data.filter((item) => item.id !== id);

    if (data.length > 1) {
      const newSum = getSumByArray(newList);
      updateDataList(
        {
          newSum,
          newList,
        },
      );
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
      editInputListItemHandler(editedItem);
      setFocusToItem(editedItem.id, 'first');
    }
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
    <div className={['panel', dataInputList].join(' ')}>
      <div className={['panel-header', dataInputListHeader].join(' ')}>
        <div className={['panel-header-title', dataInputListHeaderTitle].join(' ')}>
          {title}
        </div>
        <div className={['panel-header-subtitle', dataInputListHeaderDate].join(' ')}>
          <SkeletonTheme color="#252A48" highlightColor="#222743">
            { date
              ? moment(date).format('MMMM YYYY')
              : (
                <Skeleton width={50} height={20} />
              )
            }
          </SkeletonTheme>
        </div>
      </div>
      <div className={['panel-body', dataInputListBody].join(' ')}>
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
                  {data && (
                    <button className={addRowButton} type="button" onClick={() => addInputListItemHandler()}>
                      <FontAwesomeIcon icon={faPlus} />
                      &nbsp; Добавить строчку &nbsp;
                      <sub>↳ Enter</sub>
                    </button>
                  )}
                </td>
              </tr>
            </tfoot>
            <tbody ref={tbody}>
              {data
                ? data.map((item, i) => (
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
                ))
                : (
                  <tr>
                    <td>
                      <SkeletonTheme color="#252A48" highlightColor="#222743">
                        <Skeleton width={30} height={20} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme color="#252A48" highlightColor="#222743">
                        <Skeleton width={100} height={20} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme color="#252A48" highlightColor="#222743">
                        <Skeleton width={100} height={20} />
                      </SkeletonTheme>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={['panel-footer', dataInputListFooter].join(' ')}>
        <div className={dataInputListSum}>
          Сумма: &nbsp;
          <SkeletonTheme color="#252A48" highlightColor="#222743">
            <span>
              {sum || <Skeleton width={50} height={15} />}
            </span>
          </SkeletonTheme>
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
};

export default DataInputList;
