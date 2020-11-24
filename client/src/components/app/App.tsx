import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wrapper from 'components/wrapper/Wrapper';
import Stories from 'components/stories/Stories';
import Story from 'components/story/Story';
import Login from 'components/forms/Login';
import Register from 'components/forms/Register';
import RouteGuard from 'components/route/RouteGuard';
import PageNotFound from 'components/pages/404';

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <RouteGuard path='/stories' exact={true} component={Stories} />
        <RouteGuard path='/stories/new' exact={true} component={Story} />
        <RouteGuard path='/stories/edit/:id' exact={true} component={Story} />
        <Route component={PageNotFound} />
      </Switch>
    </Wrapper>
  );
};

export default App;