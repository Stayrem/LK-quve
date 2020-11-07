import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './DataInputListItem.module.scss';

const DataInputListItem = (props) => {
  const {
    id,
    name,
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
  } = props;
  const {
    focused,
    dataInputListItemBtnDelete,
  } = styles;

  const [currentName, setCurrentName] = useState(name);
  const [currentValue, setCurrentValue] = useState(value);
  const [currentStatus, setCurrentStatus] = useState(status);

  const nameInput = useRef();
  const valueInput = useRef();

  useEffect(() => {
    setCurrentName(name);
    setCurrentValue(value);
    setCurrentStatus(status);
  }, [name, value, status]);

  useEffect(() => {
    const editedItem = {
      id,
      name: currentName,
      value: currentValue,
      status: currentStatus,
    };
    editInputListItem(editedItem);
  }, [currentName, currentValue, currentStatus]);

  useEffect(() => {
    if (isFocused) {
      switch (focusedInputType) {
        case 'first':
          nameInput.current.focus();
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
        if (!currentName && !currentValue && isDeletingAccepted) {
          setFocusToItem(id, 'last', 'prev');
          deleteInputListItem(id);
        }
        if (!currentValue && !isDeletingAccepted) {
          event.preventDefault();
          nameInput.current.focus();
        }
        if (!currentName && currentValue && isDeletingAccepted) {
          setFocusToItem(id, 'last', 'prev');
        }
        break;
      case 'Enter':
      case 'Tab':
        event.preventDefault();
        if (currentName && currentValue && isAddingAccepted && isLast) {
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

  return (
    <tr
      className={isFocused ? focused : ''}
    >
      <td onClick={(event) => setFocusOnRow(event, 'first')}>{index + 1}</td>
      <td className="py-0" onClick={(event) => setFocusOnRow(event, 'first')}>
        <input
          ref={nameInput}
          type="text"
          placeholder="Название..."
          defaultValue={name}
          onChange={(event) => setCurrentName(event.target.value)}
          onKeyDown={(event) => onKeyUpHandler(event, false, true)}
          onClick={(event) => setFocusOnRow(event, 'none')}
        />
      </td>
      <td
        className="py-0"
        onClick={(event) => setFocusOnRow(event, 'last')}
        style={{ textDecoration: currentStatus ? 'unset' : 'line-through' }}
      >
        <input
          ref={valueInput}
          type="number"
          placeholder="Размер..."
          defaultValue={value}
          onChange={(event) => setCurrentValue(event.target.value)}
          onKeyDown={(event) => onKeyUpHandler(event, true, false)}
          onClick={(event) => setFocusOnRow(event, 'none')}
        />
      </td>
      {useStatus && <td onClick={(event) => setFocusOnRow(event, 'last')}>
        { currentStatus
          ? <span role="button" onClick={() => setCurrentStatus(!currentStatus)} className="label label-active">Учитывать</span>
          : <span role="button" onClick={() => setCurrentStatus(!currentStatus)} className="label">Не учитывать</span>
        }
      </td>}
      <td onClick={(event) => setFocusOnRow(event, 'none')}>
        <button className={dataInputListItemBtnDelete} type="button" tabIndex="-1" onClick={() => deleteInputListItem(id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

DataInputListItem.defaultProps = {
  name: '',
  value: null,
  status: true,
  isFocused: false,
  focusedInputType: 'none',
  isLast: false,
  useStatus: true,
};

DataInputListItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
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
};

export default DataInputListItem;
