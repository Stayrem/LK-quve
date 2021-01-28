import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import routerDict from '@utils/routesDict';
import { useAuth } from '../../hooks/use-auth.js';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => (auth.user ? (children) : (
        <Redirect
          to={{
            pathname: routerDict.SIGN_IN,
            state: {
              from: location,
            },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
