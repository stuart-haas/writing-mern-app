import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { generateId } from 'utils/functions';

// TODO: Fix getState type
export const toggleTheme = (dispatch: Dispatch, getState: any) => {
  const currentTheme = getState().theme.theme;
  const theme = currentTheme === 'light' ? 'dark' : 'light';
  dispatch({
    type: ActionTypes.UPDATE_THEME,
    payload: { theme },
  });
  dispatch({
    type: ActionTypes.ADD_MESSAGE,
    payload: {
      id: generateId('toast'),
      type: 'toast',
      message: `${theme} theme enabled`,
      status: 'success',
    },
  });
};
