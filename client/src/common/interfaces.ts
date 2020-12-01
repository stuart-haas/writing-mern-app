import { MessagePayload } from 'redux/message/reducers';
import { ThemePayload } from 'redux/theme/reducers';
import { UserPayload } from 'redux/user/reducers';

export interface IParams {
  id?: string;
  username?: string;
}

export interface IStory {
  _id?: string;
  slug?: string;
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
  currentPassword?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface UserState {
  user: UserPayload;
}

export interface IMessage {
  id: string;
  type: string;
  message: string;
  status: string;
}

export interface MessageState {
  message: MessagePayload;
}

export interface ThemeState {
  theme: ThemePayload;
}

export interface IThemeColor {
  name: string;
  color: string;
}

export interface IThemeType {
  [key: string]: IThemeColor[];
}
