import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = (props) => {
  const { items } = props;
  const {
    breadcrumbs,
    breadcrumbsHome,
    breadcrumbsItems,
    breadcrumbsItem,
  } = styles;
  return (
    <div className={breadcrumbs}>
      <ul className={breadcrumbsItems}>
        <li className={[breadcrumbsItem, breadcrumbsHome].join(' ')}>
          <a href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
        {
          items.map((item, index) => (
            <li className={breadcrumbsItem} key={index}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

Breadcrumbs.defaultProps = {
  items: [],
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default Breadcrumbs;
