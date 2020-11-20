import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Wrapper from 'components/Wrapper/Wrapper';
import Stories from 'components/Stories/Stories';
import Story from 'components/Story/Story';
import Login from 'components/Login/Login';
import withAuth from 'middlewares/withAuth';
import './style.scss';

const ErrorPage = () => {
  return <h1>404 - Not Found</h1>;
};

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Wrapper>
          <Switch>
            <Route path='/login' exact={true} component={Login} />
            <Route path='/stories' exact={true} component={withAuth(Stories)} />
            <Route
              path='/stories/new'
              exact={true}
              component={withAuth(Story)}
            />
            <Route
              path='/stories/edit/:id'
              exact={true}
              component={withAuth(Story)}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Wrapper>
      </Router>
    </div>
  );
};

export default App;
