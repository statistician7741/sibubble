import * as actionTypes from "../types/layout.type";

export const toggleSideMenuCollapsed = ( sideMenuCollapsed ) => dispatch => {
  return dispatch({ type: actionTypes.TOGGLE_SIDEMENU_COLLAPSED, sideMenuCollapsed })
}