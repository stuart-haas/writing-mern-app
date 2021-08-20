import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { IThemeType, ThemeState, IThemeColor } from 'common/interfaces';

const App = () => {
  /* eslint-disable */
  const themeColours: IThemeType = {
    light: [
      {
        name: 'background',
        color: '#fff',
      },
      {
        name: 'background-dark',
        color: '#edf2f4',
      },
      {
        name: 'background-light',
        color: '#dfe8ec',
      },
      {
        name: 'text',
        color: '#252422',
      },
      {
        name: 'text-base',
        color: '#8d99ae',
      },
      {
        name: 'text-light',
        color: '#d0dde2',
      },
      {
        name: 'text-dark',
        color: '#5e6472',
      },
      {
        name: 'text-error',
        color: '#edf2f4',
      },
      {
        name: 'background-error',
        color: '#d62828',
      }
    ],
    dark: [
      {
        name: 'background',
        color: '#454954',
      },
      {
        name: 'background-dark',
        color: '#17191c',
      },
      {
        name: 'background-light',
        color: '#252422',
      },
      {
        name: 'text',
        color: '#edf2f4',
      },
      {
        name: 'text-base',
        color: '#edf2f4',
      },
      {
        name: 'text-light',
        color: '#0d0d0c',
      },
      {
        name: 'text-dark',
        color: '#edf2f4',
      },
      {
        name: 'text-error',
        color: '#df5353',
      },
      {
        name: 'background-error',
        color: '#410c0c',
      }
    ],
  };

  const theme = useSelector((state: ThemeState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    themeColours[theme.theme].forEach((e: IThemeColor) => {
      document.body.style.setProperty(
        `--color-${e.name}`, e.color,
      );
    });
  }, [theme]);

  return (
    <Container>
      <Switch>
        <Route path='/login' exact={true} component={() => <Page><Login /></Page>} />
        <Route path='/register' exact={true} component={() => <Page><Register /></Page>} />
        <Route path='/' exact={true} component={() => <Page title='Published Stories'><PublishedStories /></Page>} />
        <Route path='/stories/:username' exact={true} component={() => <Page><PublishedStory /></Page>} />
        <Route path='/authors/:username' exact={true} component={() => <Page><UserStories /></Page>} />
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
      <ToastContainer autoDismiss autoDismissDelay={750} />
    </Container>
  );
  /* eslint-disable */
};

export default App;
