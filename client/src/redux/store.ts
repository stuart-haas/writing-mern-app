import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiInterceptor } from 'services/api';
import auth from 'redux/auth/reducers';
import message from 'redux/message/reducers';

const rootReducer = combineReducers({
  auth,
  message,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

apiInterceptor(store);

export default store;
