import { Dispatch } from 'redux';
import { IUser } from 'common/interfaces';
import { LOGIN, LOGOUT } from 'redux/actions';
import { login, logout, token } from 'services/api';

const INITIAL_STATE = {
  authenticated: false,
  username: '',
};

const Auth = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN: {
      const { authenticated, username } = action.payload;
      return {
        ...state,
        authenticated,
        username,
      };
    }
    case LOGOUT: {
      const { authenticated, username } = action.payload;
      return {
        ...state,
        authenticated,
        username,
      };
    }
    default:
      return state;
  }
};

export const authLogin = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    const response = await login(data);
    if (response) {
      dispatch({
        type: LOGIN,
        payload: { authenticated: true, username: response.data.username },
      });
    }
  };
};

export const authLogout = async (dispatch: Dispatch) => {
  const response = await logout();
  if (response) {
    dispatch({ type: LOGOUT, payload: { authenticated: false, username: '' } });
  }
};

export const authToken = async (dispatch: Dispatch) => {
  const response = await token();
  if (response) {
    dispatch({
      type: LOGIN,
      payload: { authenticated: true, username: response.data.username },
    });
  }
};

export default Auth;
