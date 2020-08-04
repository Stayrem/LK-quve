import * as React from 'react';
import styles from './PageContainer.module.scss';

export interface ContainerProps {
  children: React.ReactNode
}

const PageContainer = ({ children }: ContainerProps) => {
  const { container } = styles;
  return (
    <div className={container}>
      {children}
    </div>
  )
}

export default PageContainer;
