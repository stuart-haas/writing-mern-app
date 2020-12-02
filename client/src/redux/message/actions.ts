import { IMessage } from 'common/interfaces';
import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';

export const addMessage = (message: IMessage) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: message,
    });
  };
};

export const removeMessage = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_MESSAGE,
      payload: { id },
    });
  };
};
