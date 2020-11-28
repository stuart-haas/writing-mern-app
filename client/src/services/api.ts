import axios from 'axios';
import { IStory } from 'common/interfaces';
import { authLogout } from 'redux/auth/actions';

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
        store.dispatch(authLogout);
      }
      if (error.response.status === 422) {
        console.log(error);
      }
      return Promise.reject(error);
    }
  );
};

export async function getStory(id = '') {
  const response = await api.get(`/story/${id}`);
  return response.data;
}

export async function saveStory(data: IStory, id = '') {
  const method = id ? 'PATCH' : 'POST';
  const response = await api.request({
    url: `/story/${id}`,
    method,
    data,
  });
  return response.data;
}

export async function deleteStory(id: string) {
  const response = await api.delete(`/story/${id}`);
  return response.data;
}

export default api;
