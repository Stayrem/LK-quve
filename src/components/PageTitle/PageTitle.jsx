import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './PageTitle.module.scss';

const PageTitle = (props) => {
  const { title } = props;
  const { pageTitle } = styles;
  return (
    <SkeletonTheme color="#252A48" highlightColor="#222743">
      <h1 className={pageTitle}>
        {title || <Skeleton />}
      </h1>
    </SkeletonTheme>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
