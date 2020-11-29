import { Dispatch } from 'redux';
import ActionTypes from './actionTypes';
import { IUser } from 'common/interfaces';
import api from 'services/api';

export const authLogin = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    const response = await api.post('/auth/login', data);
    const { _id, username } = response.data;
    const user = { _id, username };
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: ActionTypes.LOGIN,
      payload: { user, authenticated: true },
    });
  };
};

export const authLogout = async (dispatch: Dispatch) => {
  await api.post('/auth/logout');
  localStorage.removeItem('user');
  dispatch({
    type: ActionTypes.LOGOUT,
    payload: { user: {}, authenticated: false },
  });
};

export const authRegister = (data: IUser) => {
  return async () => {
    return await api.post('/auth/register', data);
  };
};
