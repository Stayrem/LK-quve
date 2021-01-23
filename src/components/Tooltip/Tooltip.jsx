import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import styles from './Tooltip.module.scss';

const Tooltip = (props) => {
  const { id, text } = props;
  const { tooltipButton, tooltipText } = styles;
  return (
    <div>
      <button
        className={['btn btn-circle btn-secondary', tooltipButton].join(' ')}
        type="button"
        data-tip
        data-for={id}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </button>
      <ReactTooltip id={id} place="top" type="dark" effect="solid">
        <p className={tooltipText}>{text}</p>
      </ReactTooltip>
    </div>
  );
};

Tooltip.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
};

export default Tooltip;
