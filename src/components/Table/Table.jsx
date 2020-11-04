import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
  const {
    head, rows, onAdd, onRemove,
  } = props;

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {head.map((headItem) => <td>{headItem}</td>)}
          </tr>
        </thead>
        {rows.map((row) => (
          <tr>
            {row.map((rowItem) => <input defaultValue={rowItem} />)}
          </tr>
        ))}
      </table>
    </div>
  );
};

Table.propTypes = {
  head: PropTypes.arrayOf(PropTypes.any).isRequired,
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Table;
