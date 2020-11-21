import { Dispatch } from 'redux';
import { IUser } from 'common/interfaces';
import { login, logout, token } from 'services/api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const TOKEN = 'TOKEN';

const INITIAL_STATE = {
  authenticated: false,
};

const Auth = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN: {
      const { authenticated } = action.payload;
      return {
        ...state,
        authenticated,
        token,
      };
    }
    case LOGOUT: {
      const { authenticated } = action.payload;
      return {
        ...state,
        authenticated,
        token,
      };
    }
    case TOKEN: {
      const { authenticated } = action.payload;
      return {
        ...state,
        authenticated,
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
        payload: { authenticated: true },
      });
    }
  };
};

export const authLogout = async (dispatch: Dispatch) => {
  const response = await logout();
  if (response) {
    dispatch({ type: LOGOUT, payload: { authenticated: false } });
  }
};

export const authToken = async (dispatch: Dispatch) => {
  const response = await token();
  if (response) {
    dispatch({
      type: TOKEN,
      payload: { authenticated: true },
    });
  }
};

export default Auth;
