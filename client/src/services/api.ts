import axios from 'axios';
import { userLogout } from 'redux/user/actions';

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
      }
      return Promise.reject(error);
    }
  );
};

export default api;
