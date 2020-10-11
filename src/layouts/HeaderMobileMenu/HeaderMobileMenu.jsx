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
        <img height="25" src={logo} alt="логотип" />
      </div>
      <nav className={nav}>
        <ul className={list}>
          {menuItems.map((listItem) => (
            <li key={listItem.id}>
              <Link to={listItem.url} className={link}>
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
