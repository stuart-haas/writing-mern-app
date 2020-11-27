import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }: any) => {
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
  }, [auth]);

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

export default PrivateRoute;
