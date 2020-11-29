import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { IStory } from 'common/interfaces';
import api from 'services/api';
import { generateId } from 'utils/functions';

export const saveStory = (data: IStory, id = '', message = 'Story Saved!') => {
  return async (dispatch: Dispatch) => {
    try {
      const method = id ? 'PATCH' : 'POST';
      const response = await api.request({
        url: `/story/${id}`,
        method,
        data,
      });
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: message,
          status: 'success',
        },
      });
      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Something went wrong :(',
          status: 'error',
        },
      });
    }
  };
};

export const deleteStory = (id: string, message = 'Story Deleted') => {
  return async (dispatch: Dispatch) => {
    try {
      await api.delete(`/story/${id}`);
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: message,
          status: 'success',
        },
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Something went wrong :(',
          status: 'error',
        },
      });
    }
  };
};

export const getStory = (id = '') => {
  return async (dispatch: Dispatch) => {
    try {
      return await api.get(`/story/${id}`);
    } catch (error) {
      dispatch({
        type: ActionTypes.MESSAGE_ADD,
        payload: {
          id: generateId('toast'),
          type: 'toast',
          message: 'Something went wrong :(',
          status: 'error',
        },
      });
    }
  };
};
