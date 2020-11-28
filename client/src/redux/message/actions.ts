import { IMessage } from 'common/interfaces';
import { Dispatch } from 'redux';
import ActionTypes from './actionTypes';

export const addMessage = (message: IMessage) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.ADD,
      payload: message,
    });
  };
};

export const removeMessage = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE,
      payload: { id },
    });
  };
};
