/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import isEqual from 'lodash/isEqual';
import styles from './DataInputListItem.module.scss';

const ListItemEditStatus = (props) => {
  const {
    isPending,
    storedData,
    stateData,
    onEditComplete,
  } = props;

  const {
    dataInputListItemIcon,
    dataInputListItemIconBtn,
    dataInputListItemIconTd,
  } = styles;

  if (!isEqual(storedData, stateData) && !isPending) {
    return (
      <td className={dataInputListItemIconTd}>
        <button className={[dataInputListItemIcon, dataInputListItemIconBtn].join(' ')} onClick={() => onEditComplete(stateData)} type="button">
          <FontAwesomeIcon icon={faCheck} color="#FAC620" />
        </button>
      </td>
    );
  }
  if (isPending) {
    return (
      <td className={dataInputListItemIconTd}>
        <div className={dataInputListItemIcon}>
          <FontAwesomeIcon icon={faSpinner} color="#FAC620" className="fa-pulse" />
        </div>
      </td>
    );
  }
  return <td className={dataInputListItemIconTd}>&nbsp;</td>;
};

const DataInputListItem = (props) => {
  const {
    id,
    category,
    value,
    status,
    isFocused,
    focusedInputType,
    isLast,
    useStatus,
    addInputListItem,
    deleteInputListItem,
    editInputListItem,
    setFocusToItem,
    index,
    isPending,
    isNew,
  } = props;

  const {
    focused,
    pending,
    dataInputListItemIcon,
    dataInputListItemIconBtn,
  } = styles;

  const [item, editItem] = useState({
    id, category, value, status, isNew,
  });

  const categoryInput = useRef();
  const valueInput = useRef();

  const onEditComplete = (editedItem) => {
    editInputListItem(editedItem);
  };

  useEffect(() => {
    if (isFocused) {
      switch (focusedInputType) {
        case 'first':
          categoryInput.current.focus();
          break;
        case 'last':
          valueInput.current.focus();
          break;
        default:
          break;
      }
    }
  }, [isFocused, focusedInputType]);

  const onKeyUpHandler = (event, isAddingAccepted, isDeletingAccepted) => {
    switch (event.key) {
      case 'Backspace':
        if (!item.category && !item.value && isDeletingAccepted) {
          setFocusToItem(id, 'last', 'prev');
          deleteInputListItem(item);
        }
        if (!item.value && !isDeletingAccepted) {
          event.preventDefault();
          categoryInput.current.focus();
        }
        if (!item.category && item.value && isDeletingAccepted) {
          setFocusToItem(id, 'last', 'prev');
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (!isEqual({
          id, category, value, status, isNew,
        }, item) && !isPending) {
          onEditComplete(item);
        } else {
          if (item.category && item.value && isAddingAccepted && isLast) {
            addInputListItem();
          }
          if (!isAddingAccepted) {
            valueInput.current.focus();
          }
          if (isAddingAccepted && !isLast) {
            setFocusToItem(id, 'first', 'next');
          }
        }
        break;
      case 'Tab':
        event.preventDefault();
        if (item.category && item.value && isAddingAccepted && isLast) {
          addInputListItem();
        }
        if (!isAddingAccepted) {
          valueInput.current.focus();
        }
        if (isAddingAccepted && !isLast) {
          setFocusToItem(id, 'first', 'next');
        }
        break;
      default:
        break;
    }
  };

  const setFocusOnRow = (event, inputType) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setFocusToItem(id, inputType);
    }
  };

  const trStyles = [isFocused ? focused : '', isPending ? pending : ''];

  return (
    <tr className={trStyles.join(' ')}>
      <td onClick={(event) => setFocusOnRow(event, 'first')}>{index + 1}</td>
      <td className="py-0" onClick={(event) => setFocusOnRow(event, 'first')}>
        <input
          ref={categoryInput}
          type="text"
          placeholder="Название..."
          defaultValue={category}
          onChange={(event) => editItem({ ...item, category: event.target.value })}
          onKeyDown={(event) => onKeyUpHandler(event, false, true)}
          onClick={(event) => setFocusOnRow(event, 'none')}
        />
      </td>
      <td
        className="py-0"
        onClick={(event) => setFocusOnRow(event, 'last')}
        style={{ textDecoration: status ? 'unset' : 'line-through' }}
      >
        <input
          ref={valueInput}
          type="text"
          placeholder="Размер..."
          defaultValue={value}
          onChange={(event) => editItem({
            ...item,
            value: parseInt(event.target.value, 10),
          })}
          onKeyDown={(event) => onKeyUpHandler(event, true, false)}
          onClick={(event) => setFocusOnRow(event, 'none')}
        />
      </td>
      {useStatus && (
      <td onClick={(event) => setFocusOnRow(event, 'last')}>
        { status
          ? <button type="button" onClick={() => editItem({ ...item, status: !status })} className="label label-active s_button">Не Учитывать</button>
          : <button type="button" onClick={() => editItem({ ...item, status })} className="label s_button">Учитывать</button>}
      </td>
      )}
      <ListItemEditStatus
        isPending={isPending}
        storedData={{
          id, category, value, status, isNew,
        }}
        onEditComplete={onEditComplete}
        stateData={item}
      />
      <td onClick={(event) => setFocusOnRow(event, 'none')}>
        <button className={[dataInputListItemIcon, dataInputListItemIconBtn].join(' ')} type="button" tabIndex="-1" onClick={() => deleteInputListItem(item)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

DataInputListItem.defaultProps = {
  category: '',
  value: null,
  status: true,
  isFocused: false,
  focusedInputType: 'none',
  isLast: false,
  useStatus: true,
  isPending: false,
  isNew: false,
};

DataInputListItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  index: PropTypes.number.isRequired,
  category: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.bool,
  isFocused: PropTypes.bool,
  focusedInputType: PropTypes.string,
  isLast: PropTypes.bool,
  useStatus: PropTypes.bool,
  deleteInputListItem: PropTypes.func.isRequired,
  editInputListItem: PropTypes.func.isRequired,
  addInputListItem: PropTypes.func.isRequired,
  setFocusToItem: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  isNew: PropTypes.bool,
};

ListItemEditStatus.propTypes = {
  isPending: PropTypes.bool.isRequired,
  storedData: PropTypes.objectOf(PropTypes.any).isRequired,
  stateData: PropTypes.objectOf(PropTypes.any).isRequired,
  onEditComplete: PropTypes.func.isRequired,
};

export default DataInputListItem;
