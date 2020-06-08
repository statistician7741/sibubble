import * as actionTypes from "../types/socket.type";

export const setSocket = (socket) => dispatch => {
  return dispatch({ type: actionTypes.SET_SOCKET, socket })
}