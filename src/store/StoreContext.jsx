import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStore } from 'mobx-react-lite';
import createOverviewStore from './store';

const StoreContext = createContext(null);

const Provider = (props) => {
  const { children } = props;
  const store = useLocalStore(createOverviewStore);
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
