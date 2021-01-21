import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import styles from './PageTitle.module.scss';
import SkeletonContainer from '../../hocs/SkeletonContainer/SkeletonContainer';

const PageTitle = (props) => {
  const { title } = props;
  const { pageTitle } = styles;
  return (
    <SkeletonContainer>
      <h1 className={pageTitle}>
        {title || <Skeleton />}
      </h1>
    </SkeletonContainer>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
