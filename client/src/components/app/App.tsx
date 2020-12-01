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
import { setTheme } from 'redux/theme/actions';
import { IThemeType, ThemeState, IThemeColor } from 'common/interfaces';

const App = () => {
  /* eslint-disable */
  const themeColours: IThemeType = {
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
        name: 'background-gray',
        color: '#edf2f4',
      },
      {
        name: 'background-dark-gray',
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
        name: 'background-gray',
        color: '#17191c',
      },
      {
        name: 'background-dark-gray',
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

  const theme = useSelector((state: ThemeState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTheme);
  }, []);

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
        <Route path='/' exact={true} component={() => <Page><PublishedStories /></Page>} />
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
      <ToastContainer autoDismiss autoDismissDelay={3000} />
    </Container>
  );
  /* eslint-disable */
};

export default App;
