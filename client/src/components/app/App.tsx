import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wrapper from 'components/wrapper/Wrapper';
import Stories from 'components/stories/Stories';
import Story from 'components/story/Story';
import Login from 'components/login/Login';
import Register from 'components/register/Register';
import RouteGuard from 'components/route/RouteGuard';
import './style.scss';

const ErrorPage = () => {
  return <h1>404 - Not Found</h1>;
};

const App = () => {
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
