import axios from 'axios';
import { logoutUser, refreshToken } from 'redux/user/actions';

const api = axios.create({
  baseURL: new URL('/api', process.env.REACT_APP_SERVER_URL).toString(),
  withCredentials: true,
});

// TODO: Fix store type
export const apiInterceptor = (store: any) => {
  api.interceptors.request.use(
    async (config) => {
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
      const originalRequest = error.config;
      if (error.response) {
        if (error.response.status === 401) {
          originalRequest._retry = true;
          store.dispatch(refreshToken);
          return api(originalRequest);
        } else {
          store.dispatch(logoutUser);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
