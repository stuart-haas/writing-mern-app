import { IUser } from 'common/interfaces';
import ActionTypes from 'redux/actionTypes';

const INITIAL_STATE: ThemePayload = {
  theme: 'light',
};

interface ThemePayload {
  theme: string;
}

export interface ThemeAction {
  type: ActionTypes;
  payload: ThemePayload;
}

const User = (state = INITIAL_STATE, action: ThemeAction) => {
  switch (action.type) {
    case ActionTypes.THEME_UPDATE: {
      const { theme } = action.payload;
      return {
        ...state,
        theme,
      };
    }
    default:
      return state;
  }
};

export default User;
