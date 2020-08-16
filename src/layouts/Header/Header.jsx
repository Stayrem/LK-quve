import * as React from 'react';
import { useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import budjets from './images/budjets.svg';
import costs from './images/costs.svg';
import overview from './images/overview.svg';
import profits from './images/profits.svg';
import savings from './images/savings.svg';
import HeaderMobileMenu from '../HeaderMobileMenu/HeaderMobileMenu';
import Container from '../../hocs/PageContainer/PageContainer';

const menuItems = [
  {
    title: 'Сводка',
    icon: overview,
    id: 0,
  },
  {
    title: 'Доходы',
    icon: profits,
    id: 1,
  },
  {
    title: 'Постоянные расходы',
    icon: costs,
    id: 2,
  },
  {
    title: 'Сбережения',
    icon: savings,
    id: 3,
  },
  {
    title: 'Дополнительные бюджеты',
    icon: budjets,
    id: 4,
  },
];

const Header = () => {
  const {
    header,
    title,
    btn,
    notActive,
    active,
    burgerLine,
    headerInner,
    logoWrapper,
    nav,
    list,
    item,
    link,
    mobileMenu,
    mobileMenuOpened,
    headerLogo,
    exit,
    exitWrapper,
  } = styles;
  const [isMenuOpened, toggleMenu] = useState(false);
  const buttonClassname = isMenuOpened ? active : notActive;
  const mobMenuClassname = isMenuOpened ? mobileMenuOpened : '';
  return (
    <header className={header}>
      <Container>
        <div className={headerInner}>
          <Link to="/" className={logoWrapper}>
            <img src={logo} alt="Логотип" className={headerLogo} />
            <h1 className={title}>Where is my money?</h1>
          </Link>
          <nav className={nav}>
            <ul className={list}>
              {menuItems.map((listItem) => (
                <li key={listItem.id} className={item}>
                  <Link to="/" className={link}>{listItem.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className={[btn, buttonClassname, 's_button'].join(' ')} onClick={() => toggleMenu((prev) => !prev)}>
            <span className={burgerLine} />
            <span className={burgerLine} />
            <span className={burgerLine} />
          </button>
          <div className={exitWrapper}>
            <a href="/" className={exit}>Выход</a>
          </div>
        </div>
      </Container>
      <div className={[mobileMenu, mobMenuClassname].join(' ')}>
        <HeaderMobileMenu menuItems={menuItems} />
      </div>
    </header>
  );
};

export default Header;
