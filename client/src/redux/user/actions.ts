import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { IUser } from 'common/interfaces';
import api from 'services/api';
import { generateId } from 'utils/functions';

export const userLogin = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/auth/login', data);
      const { _id, username } = response.data;
      const user = { _id, username };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: ActionTypes.USER_LOGIN,
        payload: { user, authenticated: true },
      });
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Login Successful',
          status: 'success',
        },
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Login Failed',
          status: 'error',
        },
      });
    }
  };
};

export const userLogout = async (dispatch: Dispatch) => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
    dispatch({
      type: ActionTypes.USER_LOGOUT,
      payload: { user: {}, authenticated: false },
    });
    dispatch({
      type: ActionTypes.MESSAGE_ADD,
      payload: {
        id: generateId('toast'),
        type: 'toast',
        message: 'Logout Successful',
        status: 'success',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const userRegister = (data: IUser) => {
  return async () => {
    return await api.post('/auth/register', data);
  };
};
