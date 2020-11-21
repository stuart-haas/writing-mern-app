import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Wrapper from 'components/wrapper/Wrapper';
import Stories from 'components/stories/Stories';
import Story from 'components/story/Story';
import Login from 'components/login/Login';
import Register from 'components/register/Register';
import RouteGuard from 'components/route/RouteGuard';
import { authToken } from 'redux/reducers/auth';
import './style.scss';

const ErrorPage = () => {
  return <h1>404 - Not Found</h1>;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authToken);
  }, [dispatch]);

  return (
    <Wrapper>
      <Switch>
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <RouteGuard path='/stories' exact={true} component={Stories} />
        <RouteGuard path='/stories/new' exact={true} component={Story} />
        <RouteGuard path='/stories/edit/:id' exact={true} component={Story} />
        <Route component={ErrorPage} />
      </Switch>
    </Wrapper>
  );
};

export default App;
