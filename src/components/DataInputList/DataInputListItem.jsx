import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './DataInputListItem.module.scss';

const DataInputListItem = (props) => {
  const {
    type,
    id,
    name,
    value,
    status,
    isFocused,
    deleteInputListItem,
    editInputListItem,
    addInputListItem,
  } = props;
  const {
    focused,
  } = styles;

  const [currentName, setCurrentName] = useState(name);
  const [currentValue, setCurrentValue] = useState(value);
  const [currentStatus, setCurrentStatus] = useState(status);

  const nameInput = useRef();
  const valueInput = useRef();

  useEffect(() => {
    const editedItem = {
      id,
      name: currentName,
      value: currentValue,
      status: currentStatus,
    };
    editInputListItem(type, editedItem);
  }, [currentName, currentValue, currentStatus]);

  const onKeyUpHandler = (event, isAddingAccepted, isDeletingAccepted) => {
    switch (event.key) {
      case 'Backspace':
        if (!name && !value && isDeletingAccepted) {
          deleteInputListItem(type, id);
        }
        if (!value && !isDeletingAccepted) {
          event.preventDefault();
          nameInput.current.focus();
        }
        break;
      case 'Enter':
        if (name && value && isAddingAccepted) {
          addInputListItem(type);
        }
        if (!isAddingAccepted) {
          event.preventDefault();
          valueInput.current.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <tr className={isFocused ? focused : ''}>
      <td>{id}</td>
      <td className="py-0">
        <input
          ref={nameInput}
          type="text"
          placeholder="Название..."
          defaultValue={currentName}
          autoFocus={isFocused}
          onChange={(event) => setCurrentName(event.target.value)}
          onKeyDown={(event) => onKeyUpHandler(event, false, true)}
          data-enter="true"
        />
      </td>
      <td
        className="py-0"
        style={{ textDecoration: currentStatus ? 'unset' : 'line-through' }}
      >
        <input
          ref={valueInput}
          type="number"
          placeholder="Размер..."
          defaultValue={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onKeyDown={(event) => onKeyUpHandler(event, true, false)}
        />
      </td>
      <td>
        { currentStatus
          ? <span role="button" onClick={() => setCurrentStatus(!currentStatus)} className="label label-active">Учитывать</span>
          : <span role="button" onClick={() => setCurrentStatus(!currentStatus)} className="label">Не учитывать</span>
        }
      </td>
      <td>
        <button className="btn-delete" type="button" tabIndex="-1" onClick={() => deleteInputListItem(type, id)}>
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
};

DataInputListItem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.bool,
  isFocused: PropTypes.bool,
  deleteInputListItem: PropTypes.func.isRequired,
  editInputListItem: PropTypes.func.isRequired,
  addInputListItem: PropTypes.func.isRequired,
};

export default DataInputListItem;
