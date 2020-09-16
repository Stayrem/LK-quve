import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './PageHeadline.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/PageTitle/PageTitle';
import PageContainer from '../../hocs/PageContainer/PageContainer';

const PageHeadline = (props) => {
  const {
    breadcrumbs,
    title,
  } = props;
  const {
    pageHeadline,
    pageHeadlineFlexInner,
  } = styles;
  return (
    <div className={pageHeadline}>
      {breadcrumbs.length > 0 &&
        <Breadcrumbs items={breadcrumbs} />
      }
      <PageContainer>
        <div className={pageHeadlineFlexInner}>
          <PageTitle title={title} />
        </div>
      </PageContainer>
    </div>
  );
};

PageHeadline.defaultProps = {
  breadcrumbs: [],
};

PageHeadline.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default PageHeadline;
