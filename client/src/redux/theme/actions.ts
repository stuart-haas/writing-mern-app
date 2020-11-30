import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { generateId } from 'utils/functions';

export const setTheme = (dispatch: Dispatch) => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    dispatch({
      type: ActionTypes.THEME_UPDATE,
      payload: { theme },
    });
  }
};

// TODO: Fix getState type
export const toggleTheme = (dispatch: Dispatch, getState: any) => {
  const currentTheme = getState().theme.theme;
  const theme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  dispatch({
    type: ActionTypes.THEME_UPDATE,
    payload: { theme },
  });
  dispatch({
    type: ActionTypes.MESSAGE_ADD,
    payload: {
      id: generateId('toast'),
      type: 'toast',
      message: `${theme} theme enabled`,
      status: 'success',
    },
  });
};
