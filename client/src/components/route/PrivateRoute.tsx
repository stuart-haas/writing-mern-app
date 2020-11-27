import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'utils/hooks';

const PrivateRoute = ({ component, ...rest }: any) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
