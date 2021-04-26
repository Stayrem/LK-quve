import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './HeaderMobileMenu.module.scss';
import logo from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/use-auth';

const HeaderMobileMenu = (props) => {
  const { menuItems, menuCloseHandler } = props;
  const {
    menu, header, list, link, iconWrapper, nav, footer, footerLink,
  } = styles;
  const auth = useAuth();

  return (
    <div className={menu}>
      <div className={header}>
        <img height="25" src={logo} alt="логотип" />
        <button type="button" className="btn" onClick={() => menuCloseHandler(false)}>
          <FontAwesomeIcon icon={faTimes} color="#FAC620" size="lg" />
        </button>
      </div>
      <nav className={nav}>
        <ul className={list}>
          {menuItems.map((listItem) => (
            <li key={listItem.id}>
              <Link to={listItem.url} className={link} onClick={() => menuCloseHandler(false)}>
                {listItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer className={footer}>
        <a
          onClick={() => {
            menuCloseHandler(false);
            auth.signOut();
          }}
          className={[link, footerLink].join(' ')}
        >
          Выход
        </a>
      </footer>
    </div>
  );
};

HeaderMobileMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  menuCloseHandler: PropTypes.func.isRequired,
};

export default HeaderMobileMenu;
