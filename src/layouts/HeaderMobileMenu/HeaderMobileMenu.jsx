import * as React from 'react';
import styles from './HeaderMobileMenu.module.scss';
import logo from '../../assets/images/logo.svg';


const HeaderMobileMenu = (props) => {
  const { menuItems } = props;
  const { menu, title, header, list, link, iconWrapper, nav } = styles;
  return(
    <div className={menu}>
      <div className={header}>
        <img width="30" height="30" src={logo} alt="логотип" />
        <span className={title}>Where is my money?</span>
      </div>
      <nav className={nav}>
        <ul className={list}>
          {menuItems.map((listItem, i) => {
            return <li key={i}>
              <a href="/" className={link}>
                <div className={iconWrapper}>
                  <img src={listItem.icon} alt="иконка меню" />
                </div>
                {listItem.title}
              </a>
            </li>
          })}
        </ul>
      </nav>
    </div>
  );
}

export default HeaderMobileMenu;
