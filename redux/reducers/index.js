import { combineReducers } from "redux";

import layout from "./layout.reducer";
import organik from "./organik.reducer";
import socket from "./socket.reducer";

export default combineReducers({
  layout,
  organik,
  socket
});
