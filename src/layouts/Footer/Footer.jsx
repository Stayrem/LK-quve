import * as React from 'react';
import styles from './Footer.module.scss';
import Container from '../../hocs/PageContainer/PageContainer';

const Footer = () => {
  const {
    footer,
    footerWrapper,
    footerItem,
  } = styles;
  return (
    <footer className={footer}>
      <Container>
        <div className={footerWrapper}>
          <div className={footerItem}>
            Where is my money? © 2020. Все права защищены.
          </div>
          <div className={footerItem}>
            <a href="#">Политика конфиденциальности</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
