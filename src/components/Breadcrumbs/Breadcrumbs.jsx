import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import Container from '../../hocs/PageContainer/PageContainer';
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
    <Container>
      <div className={breadcrumbs}>
        <ul className={breadcrumbsItems}>
          <li className={`${breadcrumbsItem} ${breadcrumbsHome}`}>
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
    </Container>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Breadcrumbs;
