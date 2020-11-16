import axios from 'axios';
export const axiosClient = axios.create({
  baseURL: new URL('/api', 'http://localhost:5000').toString(),
});

export async function getStories() {
  const response = await axiosClient.get(`/story`);
  return response.data;
}

export async function getStory(id: string) {
  const response = await axiosClient.get(`/story/${id}`);
  return response.data;
}

export async function saveStory(data: any) {
  const response = await axiosClient.post(`/story/`, data);
  return response.data;
}

export async function updateStory(id: string | undefined, data: any) {
  const response = await axiosClient.patch(`/story/${id}`, data);
  return response.data;
}
