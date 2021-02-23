import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routerDict from '@utils/routesDict';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from '../../pages/Landing/Landing';

const PrivateRoute = ({ children, ...rest }) => {
  const accessToken = useSelector((state) => state.user.accessToken);

  return (
    <Route
      {...rest}
      render={({ location }) => (accessToken ? (children) : (
        (rest.path !== routerDict.ROOT)
          ? (
            <Redirect
              to={{
                pathname: routerDict.SIGN_IN,
                state: {
                  from: location,
                },
              }}
            />
          )
          : (<Landing />)
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
