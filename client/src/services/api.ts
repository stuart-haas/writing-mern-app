import axios from 'axios';
import { IStory, IUser } from 'common/interfaces';

export const axiosClient = axios.create({
  baseURL: new URL('/api', 'http://localhost:5000').toString(),
  withCredentials: true,
});

export async function getStory(id = '') {
  const response = await axiosClient.get(`/story/${id}`);
  return response.data;
}

export async function saveStory(data: IStory, id = '') {
  const method = id ? 'PATCH' : 'POST';
  const response = await axiosClient.request({
    url: `/story/${id}`,
    method,
    data,
  });
  return response.data;
}

export async function deleteStory(id: string) {
  const response = await axiosClient.delete(`/story/${id}`);
  return response.data;
}

export async function register(data: IUser) {
  const response = await axiosClient.post('/auth/register', data);
  return response.data;
}

export async function login(data: IUser) {
  const response = await axiosClient.post('/auth/login', data);
  return response.data;
}

export async function logout() {
  return await axiosClient.post('/auth/logout');
}
