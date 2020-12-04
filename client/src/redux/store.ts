import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { apiInterceptor } from 'services/api';
import user from 'redux/user/reducers';
import story from 'redux/story/reducers';
import message from 'redux/message/reducers';
import theme from 'redux/theme/reducers';
import { throttle } from 'lodash';

const persistedState = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state')!)
  : {};

export const history = createBrowserHistory();

// TODO: Fix history type
const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    user,
    story,
    message,
    theme,
  });

const store = createStore(
  rootReducer(history),
  persistedState,
  compose(applyMiddleware(thunk, routerMiddleware(history)))
);

store.subscribe(
  throttle(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
  }, 1000)
);

apiInterceptor(store);

export default store;
