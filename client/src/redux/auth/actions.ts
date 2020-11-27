import { Dispatch } from 'redux';
import ActionTypes from './actionTypes';
import { IUser } from 'common/interfaces';
import api from 'services/api';

export const authLogin = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/auth/login', data);
      const { _id, username } = response.data;
      const user = { _id, username };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: ActionTypes.LOGIN,
        payload: { user, authenticated: true },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const authLogout = async (dispatch: Dispatch) => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
    dispatch({
      type: ActionTypes.LOGOUT,
      payload: { user: {}, authenticated: false },
    });
  } catch (error) {
    console.log(error);
  }
};