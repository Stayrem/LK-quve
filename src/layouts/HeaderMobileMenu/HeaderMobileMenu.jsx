import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import styles from './HeaderMobileMenu.module.scss';
import logo from '../../assets/images/logo.svg';

const HeaderMobileMenu = (props) => {
  const { menuItems } = props;
  const {
    menu, title, header, list, link, iconWrapper, nav,
  } = styles;
  return (
    <div className={menu}>
      <div className={header}>
        <img width="30" height="30" src={logo} alt="логотип" />
        <span className={title}>Where is my money?</span>
      </div>
      <nav className={nav}>
        <ul className={list}>
          {menuItems.map((listItem) => (
            <li key={listItem.id}>
              <Link to="/" className={link}>
                <div className={iconWrapper}>
                  <img src={listItem.icon} alt="иконка меню" />
                </div>
                {listItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

HeaderMobileMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default HeaderMobileMenu;
