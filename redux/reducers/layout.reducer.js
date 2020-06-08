import * as actionTypes from "../types/layout.type";

export default (
  state = {
    sideMenuCollapsed: false,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEMENU_COLLAPSED:
      return {
        ...state,
        sideMenuCollapsed: action.sideMenuCollapsed
      }
    default: return state
  }
};
