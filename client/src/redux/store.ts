import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { apiInterceptor } from 'services/api';
import user from 'redux/user/reducers';
import story from 'redux/story/reducers';
import message from 'redux/message/reducers';
import theme from 'redux/theme/reducers';

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
  compose(applyMiddleware(thunk, routerMiddleware(history)))
);

apiInterceptor(store);

export default store;
