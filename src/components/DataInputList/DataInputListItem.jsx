import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DataInputListItem = (props) => {
  const {
    id,
    name,
    value,
    status,
  } = props;

  return (
    <tr>
      <td>{id + 1}</td>
      <td>{name}</td>
      <td style={{ textDecoration: status ? 'unset' : 'line-through' }}>{value}</td>
      <td>
        { status
          ? <span className="label label-active">Учитывать</span>
          : <span className="label">Не учитывать</span>
        }
      </td>
      <td>
        <button className="btn-delete" type="button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </td>
    </tr>
  );
};

DataInputListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
};

export default DataInputListItem;
