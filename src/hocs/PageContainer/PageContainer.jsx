import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './PageContainer.module.scss';

const PageContainer = (props) => {
  const { children } = props;
  return (
    <div className="container">
      {children}
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;
