import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { push } from 'connected-react-router';
import { IUser } from 'common/interfaces';
import api from 'services/api';
import { generateId } from 'utils/functions';

export const loginUser = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/user/login', data);
      const { _id, username, expiration } = response.data;
      const user = { _id, username, expiration };
      localStorage.setItem('session', JSON.stringify(user));
      dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: { user, authenticated: true },
      });
      dispatch({
        type: ActionTypes.ADD_MESSAGE,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Login Successful',
          status: 'success',
        },
      });
      return { response };
    } catch (error) {
      const errors = error.response;
      return { errors };
    }
  };
};

export const logoutUser = (
  message = 'Logout Succesful',
  status = 'success'
) => {
  return async (dispatch: Dispatch) => {
    await api.post('/user/logout');
    localStorage.removeItem('session');
    dispatch(push('/login'));
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: { user: {}, authenticated: false },
    });
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: generateId('toast'),
        type: 'toast',
        message: message,
        status: status,
      },
    });
  };
};

export const registerUser = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.post('/user/register', data);
      dispatch(push('/me/stories'));
      dispatch({
        type: ActionTypes.ADD_MESSAGE,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Account Created',
          status: 'success',
        },
      });
      return { response };
    } catch (error) {
      const errors = error.response;
      return { errors };
    }
  };
};

export const updateUser = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    await api.patch('/user', data);
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: generateId('toast'),
        type: 'toast',
        message: 'Account Updated',
        status: 'success',
      },
    });
  };
};

export const getCurrentUser = async () => {
  return await api.get('/user');
};
