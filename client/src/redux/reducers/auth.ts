import { Dispatch } from 'redux';
import { IUser } from 'common/interfaces';
import { login, logout, token } from 'services/api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const INITIAL_STATE = {
  authenticated: false,
  user: {},
};

const Auth = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN: {
      const { authenticated, user } = action.payload;
      return {
        ...state,
        authenticated,
        user,
      };
    }
    case LOGOUT: {
      const { authenticated, user } = action.payload;
      return {
        ...state,
        authenticated,
        user,
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
      const { _id, username } = response;
      dispatch({
        type: LOGIN,
        payload: { authenticated: true, user: { _id, username } },
      });
    }
  };
};

export const authLogout = async (dispatch: Dispatch) => {
  const response = await logout();
  if (response) {
    dispatch({ type: LOGOUT, payload: { authenticated: false, user: {} } });
  }
};

export const authToken = async (dispatch: Dispatch) => {
  const response = await token();
  if (response) {
    const { _id, username } = response;
    dispatch({
      type: LOGIN,
      payload: { authenticated: true, user: { _id, username } },
    });
  }
};

export default Auth;
