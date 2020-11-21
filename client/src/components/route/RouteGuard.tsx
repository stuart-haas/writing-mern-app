import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { authToken } from 'redux/reducers/auth';

const RouteGuard = ({ component, ...rest }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(authToken);
  }, [dispatch]);

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
