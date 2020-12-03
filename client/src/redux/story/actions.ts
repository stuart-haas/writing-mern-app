import { Dispatch } from 'redux';
import ActionTypes from 'redux/actionTypes';
import { push } from 'connected-react-router';
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
      url: `/story/${id}`,
      method,
      data,
    });
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
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
    await api.delete(`/story/${id}`);
    dispatch(push('/me/stories'));
    dispatch({
      type: ActionTypes.ADD_MESSAGE,
      payload: {
        id: generateId('toast'),
        type: 'toast',
        message,
        status,
      },
    });
  };
};

export const createStory = async (dispatch: Dispatch) => {
  const response = await api.post('/story?mode=new');
  const { data } = response;
  dispatch(push(`/me/stories/edit/${data._id}`));
};

export const getStory = (param = '') => {
  return async () => {
    return await api.get(`/story/${param}`);
  };
};

export const getPublishedStory = (param = '') => {
  return async () => {
    return await api.get(`/story/published/${param}`);
  };
};
