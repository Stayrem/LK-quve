import * as React from 'react';
import styles from './Header.module.scss';
import logo from './images/ice-cream.svg';
import Container from '../PageContainer/PageContainer';

const Header = () => {
  const { header } = styles;
  return (
    <header className={header}>
      <Container>
      <div>
        <a>
          <img src={logo} alt="Логотип" />
        </a>
        <ul>
          <li>Сводка</li>
          <li>Доходы</li>
          <li>Постоянные расходы</li>
          <li>Сбережения</li>
        </ul>
      </div>
      </Container>
    </header>
  )
}

export default Header;
