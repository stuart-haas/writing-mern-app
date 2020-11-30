import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'components/container/Container';
import PublishedStories from 'components/pages/PublishedStories';
import PublishedStory from 'components/pages/PublishedStory';
import Stories from 'components/pages/user/Stories';
import Story from 'components/pages/user/Story';
import Login from 'components/forms/Login';
import Register from 'components/forms/Register';
import PrivateRoute from 'components/route/PrivateRoute';
import ErrorPage from 'components/pages/ErrorPage';
import ToastContainer from 'components/toast/ToastContainer';
import Settings from 'components/pages/user/Settings';
import UserStories from 'components/pages/UserStories';
import Page from 'components/pages/Page';

const App = () => {
  /* eslint-disable */
  const themeColours: any = {
    light: [
      {
        name: 'text',
        color: '#252422',
      },
      {
        name: 'background',
        color: '#fff',
      },
      {
        name: 'background-contrast',
        color: '#edf2f4',
      },
      {
        name: 'background-offset',
        color: '#dfe8ec',
      },
      {
        name: 'text-gray',
        color: '#8d99ae',
      },
      {
        name: 'text-dark-gray',
        color: '#5e6472',
      }
    ],
    dark: [
      {
        name: 'text',
        color: '#edf2f4',
      },
      {
        name: 'background',
        color: '#454954',
      },
      {
        name: 'background-contrast',
        color: '#17191c',
      },
      {
        name: 'background-offset',
        color: '#252422',
      },
      {
        name: 'text-gray',
        color: '#edf2f4',
      },
      {
        name: 'text-dark-gray',
        color: '#edf2f4',
      }
    ],
  };

  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    themeColours[theme].forEach((el: any) => {
      document.body.style.setProperty(
        `--color-${el.name}`, el.color,
      );
    });
  }, [theme]);

  function toggleTheme() {
    if(theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <Container>
      <button className='button success' onClick={() => toggleTheme()}>Change Theme</button>
      <Switch>
        <Route path='/login' exact={true} component={() => <Page><Login /></Page>} />
        <Route path='/register' exact={true} component={() => <Page><Register /></Page>} />
        <Route path='/stories' exact={true} component={() => <Page><PublishedStories /></Page>} />
        <Route path='/stories/:id' exact={true} component={() => <Page><PublishedStory /></Page>} />
        <Route path='/stories/user/:username' exact={true} component={() => <Page><UserStories /></Page>} />
        <PrivateRoute path='/me/stories' exact={true} component={() => <Page title='My Stories'><Stories /></Page>} />
        <PrivateRoute
          path='/me/stories/edit/:id'
          exact={true}
          component={() => <Page><Story /></Page>}
        />
        <PrivateRoute
          path='/me/settings'
          exact={true}
          component={() => <Page><Settings /></Page>}
        />
        <Route component={ErrorPage} />
      </Switch>
      <ToastContainer autoDismiss autoDismissDelay={3000} />
    </Container>
  );
  /* eslint-disable */
};

export default App;
