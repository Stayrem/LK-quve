import * as React from 'react';
import styles from './PageContainer.module.scss';

const PageContainer = (props) => {
  const { children } = props;
  const { container } = styles;
  return (
    <div className={container}>
      {children}
    </div>
  )
}

export default PageContainer;
