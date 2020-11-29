export interface IParams {
  id: string;
}

export interface IStory {
  _id?: string;
  title?: string;
  content?: any;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: IUser;
}

export interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface IMessage {
  id: string;
  type: string;
  message: string;
  status: string;
}
