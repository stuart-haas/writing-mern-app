import { Dispatch } from 'redux';
import { IUser } from 'common/interfaces';
import { login, logout } from 'services/api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const INITIAL_STATE = {
  user: {},
  authenticated: false,
};

const Auth = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN: {
      const { user, authenticated } = action.payload;
      return {
        ...state,
        user,
        authenticated,
      };
    }
    case LOGOUT: {
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
        type: LOGIN,
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
    dispatch({ type: LOGOUT, payload: { user: {}, authenticated: false } });
  } catch (error) {
    console.log(error);
  }
};

export default Auth;
