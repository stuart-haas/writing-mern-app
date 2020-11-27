import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'utils/hooks';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
