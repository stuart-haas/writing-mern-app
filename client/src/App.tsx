import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Wrapper from 'components/Wrapper/Wrapper';
import Stories from 'components/Stories/Stories';
import Story from 'components/Story/Story';
import './App.scss';

const ErrorPage = () => {
  return <h1>404 - Not Found</h1>;
};

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Wrapper>
          <Switch>
            <Route path='/stories' exact={true}>
              <Stories />
            </Route>
            <Route path='/stories/new' exact={true}>
              <Story />
            </Route>
            <Route path='/stories/edit/:id' exact={true}>
              <Story />
            </Route>
            <Route component={ErrorPage} />
          </Switch>
        </Wrapper>
      </Router>
    </div>
  );
};

export default App;
