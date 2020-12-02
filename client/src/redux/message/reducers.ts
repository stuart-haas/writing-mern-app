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
    case ActionTypes.ADD_MESSAGE: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case ActionTypes.REMOVE_MESSAGE: {
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
