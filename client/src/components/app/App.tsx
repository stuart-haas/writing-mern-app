import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'components/container/Container';
import Stories from 'components/pages/Stories';
import Story from 'components/pages/Story';
import Login from 'components/forms/Login';
import Register from 'components/forms/Register';
import PrivateRoute from 'components/route/PrivateRoute';
import ErrorPage from 'components/pages/ErrorPage';
import ToastContainer from 'components/toast/ToastContainer';

const App = () => {
  return (
    <Container>
      <Switch>
        <Route path='/login' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <PrivateRoute path='/stories' exact={true} component={Stories} />
        <PrivateRoute path='/stories/new' exact={true} component={Story} />
        <PrivateRoute path='/stories/edit/:id' exact={true} component={Story} />
        <Route component={ErrorPage} />
      </Switch>
      <ToastContainer autoDismiss={false} autoDismissDelay={3000} />
    </Container>
  );
};

export default App;
