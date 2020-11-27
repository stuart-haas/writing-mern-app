import { Dispatch } from 'redux';
import { IUser } from 'common/interfaces';
import { login, logout } from 'services/api';

const INITIAL_STATE = {
  user: {},
  authenticated: false,
};

enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface AuthUser {
  _id: string;
  user: string;
}

interface AuthPayload {
  user: AuthUser;
  authenticated: boolean;
}

export interface AuthAction {
  type: ActionTypes;
  payload: AuthPayload;
}

const Auth = (state = INITIAL_STATE, action: AuthAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN: {
      const { user, authenticated } = action.payload;
      return {
        ...state,
        user,
        authenticated,
      };
    }
    case ActionTypes.LOGOUT: {
      const { user, authenticated } = action.payload;
      return {
        ...state,
        user,
        authenticated,
      };
    }
    default:
      return state;
  }
};

export const authLogin = (data: IUser) => {
  return async (dispatch: Dispatch) => {
    try {
      const { _id, username } = await login(data);
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
    await logout();
    localStorage.removeItem('user');
    dispatch({
      type: ActionTypes.LOGOUT,
      payload: { user: {}, authenticated: false },
    });
  } catch (error) {
    console.log(error);
  }
};

export default Auth;
