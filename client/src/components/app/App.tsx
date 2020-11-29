import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'components/container/Container';
import Stories from 'components/pages/Stories';
import Story from 'components/pages/Story';
import UserStories from 'components/pages/user/UserStories';
import UserStory from 'components/pages/user/UserStory';
import Login from 'components/forms/Login';
import Register from 'components/forms/Register';
import PrivateRoute from 'components/route/PrivateRoute';
import ErrorPage from 'components/pages/ErrorPage';
import ToastContainer from 'components/toast/ToastContainer';
import UserSettings from 'components/pages/user/UserSettings';

const App = () => {
  return (
    <Container>
      <Switch>
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <Route path='/stories' exact={true} component={Stories} />
        <Route path='/story/:id' exact={true} component={Story} />
        <PrivateRoute path='/me/stories' exact={true} component={UserStories} />
        <PrivateRoute
          path='/me/story/edit/:id'
          exact={true}
          component={UserStory}
        />
        <PrivateRoute
          path='/me/settings'
          exact={true}
          component={UserSettings}
        />
        <Route component={ErrorPage} />
      </Switch>
      <ToastContainer autoDismiss autoDismissDelay={3000} />
    </Container>
  );
};

export default App;
