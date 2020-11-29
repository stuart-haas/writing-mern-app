import ActionTypes from 'redux/actionTypes';

const INITIAL_STATE = {
  data: [],
};

const Message = (state = INITIAL_STATE, action: any) => {
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
        data: [...state.data.filter((e: any) => e.id !== id)],
      };
    }
    default:
      return state;
  }
};

export default Message;
