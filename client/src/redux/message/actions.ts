import { Dispatch } from 'redux';
import ActionTypes from './actionTypes';

export const addMessage = (type: string, message: string, status: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.ADD,
      payload: { type, message, status },
    });
  };
};

export const removeMessage = (index: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE,
      payload: { index },
    });
  };
};
