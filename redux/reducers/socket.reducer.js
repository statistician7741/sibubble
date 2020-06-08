import * as actionTypes from "../types/socket.type";

export default (
  state = {
    socket: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.socket
      }
    default: return state
  }
};
