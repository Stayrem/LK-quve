import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Skeleton from 'react-loading-skeleton';
import { getFormatedNumber } from '@utils/functions';
import DataInputListItem from './DataInputListItem';
import styles from './DataInputList.module.scss';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';

const DataInputList = (props) => {
  const {
    sum,
    data,
    title,
    subtitle,
    useStatus,
    onAdd,
    onDelete,
    onEdit,
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
          {subtitle}
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
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan="5">
                  {data && (
                    <button className={addRowButton} type="button" onClick={onAdd}>
                      <FontAwesomeIcon icon={faPlus} />
                      &nbsp; Добавить строчку &nbsp;
                      <sub>↳ Enter</sub>
                    </button>
                  )}
                </td>
              </tr>
            </tfoot>
            <tbody ref={tbody}>
              {data.map((item, i) => (
                <DataInputListItem
                  key={item.id}
                  index={i}
                  id={item.id}
                  name={item.name}
                  value={item.value}
                  status={item.status}
                  isPending={item.isPending}
                  isFocused={item.id === focusedRowId}
                  focusedInputType={focusedInputType}
                  isLast={item.id === data[data.length - 1].id}
                  useStatus={useStatus}
                  addInputListItem={onAdd}
                  deleteInputListItem={onDelete}
                  editInputListItem={onEdit}
                  setFocusToItem={setFocusToItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={['panel-footer', dataInputListFooter].join(' ')}>
        <div className={dataInputListSum}>
          Сумма: &nbsp;
          <SkeletonContainer>
            <span>
              {sum ? getFormatedNumber(sum) : <Skeleton width={50} height={15} />}
            </span>
          </SkeletonContainer>
        </div>
      </div>
    </div>
  );
};

DataInputList.defaultProps = {
  date: null,
  sum: null,
  subtitle: null,
  data: [],
  useStatus: true,
};

DataInputList.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  sum: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  useStatus: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default DataInputList;
