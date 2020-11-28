import ActionTypes from './actionTypes';

const INITIAL_STATE = {
  data: [],
};

const Message = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD: {
      const { type, message, status } = action.payload;
      return {
        ...state,
        data: [...state.data, { type, message, status }],
      };
    }
    case ActionTypes.REMOVE: {
      const { index } = action.payload;
      return {
        ...state,
        data: state.data.slice(0, index),
      };
    }
    default:
      return state;
  }
};

export default Message;
