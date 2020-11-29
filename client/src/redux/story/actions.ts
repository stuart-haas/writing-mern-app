import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { IStory } from 'common/interfaces';
import api from 'services/api';
import { generateId } from 'utils/functions';

export const saveStory = (
  data: IStory,
  id = '',
  message = 'Story Saved!',
  status = 'success'
) => {
  return async (dispatch: Dispatch) => {
    const method = id ? 'PATCH' : 'POST';
    const response = await api.request({
      url: `/story/user/${id}`,
      method,
      data,
    });
    dispatch({
      type: ActionTypes.MESSAGE_ADD,
      payload: {
        id: generateId('toast'),
        type: 'toast',
        message,
        status,
      },
    });
    return response;
  };
};

export const deleteStory = (
  id: string,
  message = 'Story Deleted',
  status = 'error'
) => {
  return async (dispatch: Dispatch) => {
    await api.delete(`/story/user/${id}`);
    dispatch({
      type: ActionTypes.MESSAGE_ADD,
      payload: {
        id: generateId('toast'),
        type: 'toast',
        message,
        status,
      },
    });
  };
};

export const getStory = (id = '', path = 'user') => {
  return async () => {
    return await api.get(`/story/${path}/${id}`);
  };
};
