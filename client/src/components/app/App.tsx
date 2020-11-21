import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Wrapper from 'components/Wrapper/Wrapper';
import Stories from 'components/Stories/Stories';
import Story from 'components/Story/Story';
import Login from 'components/Login/Login';
import RouteGuard from 'components/Route/RouteGuard';
import { authToken } from 'redux/reducers/auth';
import './style.scss';

const ErrorPage = () => {
  return <h1>404 - Not Found</h1>;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authToken);
  }, []);

  return (
    <Wrapper>
      <Switch>
        <Route path='/login' exact={true} component={Login} />
        <RouteGuard path='/stories' exact={true} component={Stories} />
        <RouteGuard path='/stories/new' exact={true} component={Story} />
        <RouteGuard path='/stories/edit/:id' exact={true} component={Story} />
        <Route component={ErrorPage} />
      </Switch>
    </Wrapper>
  );
};

export default App;
