import ActionTypes from './actionTypes';

const INITIAL_STATE = {
  user: {},
  authenticated: false,
};

interface AuthUser {
  _id: string;
  username: string;
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

export default Auth;
