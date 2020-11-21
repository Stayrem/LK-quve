import React from 'react';
import PropTypes from 'prop-types';
import { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonContainer = (props) => {
  const { children } = props;

  return (
    <SkeletonTheme color="#172737" highlightColor="#0f1b24">
      {children}
    </SkeletonTheme>
  );
};

SkeletonContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SkeletonContainer;
