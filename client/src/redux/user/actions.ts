import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { push } from 'connected-react-router';
import { IUser } from 'common/interfaces';
import api from 'services/api';
import { generateId } from 'utils/functions';

export const loginUser = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/auth/login', data);
      const { _id, username } = response.data;
      const user = { _id, username };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: ActionTypes.USER_UPDATE,
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

export const logoutUser = async (dispatch: Dispatch) => {
  await api.post('/auth/logout');
  localStorage.removeItem('user');
  dispatch(push('/login'));
  dispatch({
    type: ActionTypes.USER_UPDATE,
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
};

export const registerUser = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    await api.post('/auth/register', data);
    dispatch(push('/me/stories'));
  };
};

export const updateUser = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.patch('/auth', data);
      const { _id, username } = response.data;
      const user = { _id, username };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'User Updated',
          status: 'success',
        },
      });
      return { response };
    } catch (error) {
      const errors = error.response.data;
      return { errors };
    }
  };
};

export const getCurrentUser = (dispatch: Dispatch) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;
  if (user) {
    dispatch({
      type: ActionTypes.USER_UPDATE,
      payload: { user, authenticated: true },
    });
    return true;
  } else {
    dispatch({
      type: ActionTypes.USER_UPDATE,
      payload: { user: {}, authenticated: false },
    });
    return false;
  }
};
