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

export interface IUser {
  username: string;
  password: string;
}
