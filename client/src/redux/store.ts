import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiInterceptor } from 'services/api';
import user from 'redux/user/reducers';
import message from 'redux/message/reducers';

const rootReducer = combineReducers({
  user,
  message,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

apiInterceptor(store);

export default store;
