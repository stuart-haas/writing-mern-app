import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Wrapper from 'components/wrapper/Wrapper';
import Stories from 'components/stories/Stories';
import Story from 'components/story/Story';
import Login from 'components/forms/Login';
import Register from 'components/forms/Register';
import PrivateRoute from 'components/route/PrivateRoute';
import ErrorPage from 'components/pages/ErrorPage';

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <PrivateRoute path='/stories' exact={true} component={Stories} />
        <PrivateRoute path='/stories/new' exact={true} component={Story} />
        <PrivateRoute path='/stories/edit/:id' exact={true} component={Story} />
        <Route component={ErrorPage} />
      </Switch>
    </Wrapper>
  );
};

export default App;
