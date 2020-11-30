import { IUser } from 'common/interfaces';
import ActionTypes from 'redux/actionTypes';

const INITIAL_STATE: UserPayload = {
  user: {},
  authenticated: false,
};

export interface UserPayload {
  user: IUser;
  authenticated: boolean;
}

export interface UserAction {
  type: ActionTypes;
  payload: UserPayload;
}

const User = (state = INITIAL_STATE, action: UserAction) => {
  switch (action.type) {
    case ActionTypes.USER_UPDATE: {
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

export default User;
