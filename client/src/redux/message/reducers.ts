import { IMessage } from 'common/interfaces';
import ActionTypes from 'redux/actionTypes';

const INITIAL_STATE: MessagePayload = {
  id: '',
  data: [],
};

export interface MessagePayload {
  id: string;
  data: IMessage[];
}

export interface MessageAction {
  type: ActionTypes;
  payload: MessagePayload;
}

const Message = (state = INITIAL_STATE, action: MessageAction) => {
  switch (action.type) {
    case ActionTypes.MESSAGE_ADD: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case ActionTypes.MESSAGE_REMOVE: {
      const { id } = action.payload;
      return {
        ...state,
        data: [...state.data.filter((e: IMessage) => e.id !== id)],
      };
    }
    default:
      return state;
  }
};

export default Message;
