export interface IParams {
  id: string;
}

export interface IStory {
  _id?: string;
  title?: string;
  content?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultStoryProps = {
  title: 'Something creative',
  content: '',
  status: 'Draft',
};
