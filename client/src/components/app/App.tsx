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
import Page from 'components/pages/Page';

const App = () => {
  return (
    <Container>
      <Switch>
        <Route
          path='/login'
          exact={true}
          component={() => (
            <Page>
              <Login />
            </Page>
          )}
        />
        <Route
          path='/register'
          exact={true}
          component={() => (
            <Page>
              <Register />
            </Page>
          )}
        />
        <Route
          path='/stories'
          exact={true}
          component={() => (
            <Page>
              <Stories />
            </Page>
          )}
        />
        <Route
          path='/stories/:id'
          exact={true}
          component={() => (
            <Page>
              <Story />
            </Page>
          )}
        />
        <PrivateRoute
          path='/me/stories'
          exact={true}
          component={() => (
            <Page title='My Stories'>
              <UserStories />
            </Page>
          )}
        />
        <PrivateRoute
          path='/me/stories/edit/:id'
          exact={true}
          component={() => (
            <Page>
              <UserStory />
            </Page>
          )}
        />
        <PrivateRoute
          path='/me/settings'
          exact={true}
          component={() => (
            <Page>
              <UserSettings />
            </Page>
          )}
        />
        <Route component={ErrorPage} />
      </Switch>
      <ToastContainer autoDismiss autoDismissDelay={3000} />
    </Container>
  );
};

export default App;
