import axios from 'axios';
import { IStory } from 'common/interfaces';

export const axiosClient = axios.create({
  baseURL: new URL('/api', 'http://localhost:5000').toString(),
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
