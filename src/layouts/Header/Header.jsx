import * as React from 'react';
import { useState } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import budjets from './images/budjets.svg';
import costs from './images/costs.svg';
import overview from './images/overview.svg';
import profits from './images/profits.svg';
import savings from './images/savings.svg';
import HeaderMobileMenu from '../HeaderMobileMenu/HeaderMobileMenu.jsx';
import Container from '../../components/PageContainer/PageContainer.jsx';


const menuItems = [
  {
    title: `Сводка`,
    icon: overview,
  },
  {
    title: `Доходы`,
    icon: profits,
  },
  {
    title: `Постоянные расходы`,
    icon: costs,
  },
  {
    title: `Сбережения`,
    icon: savings,
  },
  {
    title: `Дополнительные бюджеты`,
    icon: budjets,
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
  } = styles;
  const [isMenuOpened, toggleMenu] = useState(false);
  const buttonClassname = isMenuOpened ? active : notActive;
  const mobMenuClassname = isMenuOpened ? mobileMenuOpened : '';
  return (
    <header className={header}>
      <Container>
      <div className={headerInner}>
        <a className={logoWrapper}>
          <img src={logo} alt="Логотип" className={headerLogo} />
          <h1 className={title} >Where is my money?</h1>
        </a>
        <nav className={nav}>
        <ul className={list}>
          {menuItems.map((listItem, i) => {
            return <li key={i} className={item}><a className={link}>{listItem.title}</a></li>
          })}
        </ul>
        </nav>
        <button className={ [btn, buttonClassname, 's_button'].join(' ')} onClick={() => toggleMenu(prev => !prev)}>
          <span className={burgerLine}></span>
          <span className={burgerLine}></span>
          <span className={burgerLine}></span>
        </button>
      </div>
      </Container>
      <div className={[mobileMenu, mobMenuClassname].join(' ')}>
        <HeaderMobileMenu menuItems={menuItems} />
      </div>
    </header>
  )
}

export default Header;
