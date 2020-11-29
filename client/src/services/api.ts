import axios from 'axios';
import { addMessage } from 'redux/message/actions';
import { userLogout } from 'redux/user/actions';
import { generateId } from 'utils/functions';

const api = axios.create({
  baseURL: new URL('/api', process.env.REACT_APP_SERVER_URL).toString(),
  withCredentials: true,
});

export const apiInterceptor = (store: any) => {
  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      if (error.response.status === 401) {
        store.dispatch(userLogout);
      } else {
        store.dispatch(
          addMessage({
            id: generateId('toast'),
            type: 'toast',
            message: 'Something went wrong :(',
            status: 'error',
          })
        );
      }
      return Promise.reject(error);
    }
  );
};

export default api;
