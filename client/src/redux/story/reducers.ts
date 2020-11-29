import { IStory } from 'common/interfaces';
import ActionTypes from 'redux/actionTypes';

const INITIAL_STATE: StoryPayload = {
  stories: [],
};

interface StoryPayload {
  stories: IStory[];
}

export interface StoryAction {
  type: ActionTypes;
  payload: StoryPayload;
}

const User = (state = INITIAL_STATE, action: StoryAction) => {
  switch (action.type) {
    case ActionTypes.STORY_SAVE: {
      return {
        ...state,
        stories: [...state.stories, action.payload],
      };
    }
    default:
      return state;
  }
};

export default User;
