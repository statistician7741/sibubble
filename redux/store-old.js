import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  sideMenuCollapsed: false,
  socket: null,
}

export const actionTypes = {
  TOGGLE_SIDEMENU_COLLAPSED: 'TOGGLE_SIDEMENU_COLLAPSED',
  SET_SOCKET: 'SET_SOCKET',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEMENU_COLLAPSED:
      return Object.assign({}, state, {
        sideMenuCollapsed: action.sideMenuCollapsed,
      })
    case actionTypes.SET_SOCKET:
      return Object.assign({}, state, {
        socket: action.socket,
      })
    default: return state
  }
}

// ACTIONS
export const toggleSideMenuCollapsed = ( sideMenuCollapsed ) => dispatch => {
  return dispatch({ type: actionTypes.TOGGLE_SIDEMENU_COLLAPSED, sideMenuCollapsed })
}
export const setSocket = ( socket ) => dispatch => {
  return dispatch({ type: actionTypes.SET_SOCKET, socket })
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
