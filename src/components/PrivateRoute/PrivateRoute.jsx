import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import routerDict from '@utils/routesDict';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const accessToken = useSelector((state) => state.user.accessToken);

  return (
    <Route
      {...rest}
      render={({ location }) => (accessToken ? (children) : (
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
