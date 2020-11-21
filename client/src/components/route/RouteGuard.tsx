import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const RouteGuard = ({ component, ...rest }: any) => {
  const auth = useSelector((state: any) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.authenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default RouteGuard;
