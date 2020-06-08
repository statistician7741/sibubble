import * as actionTypes from "../types/organik.type";

export const setOrganik = (socket) => dispatch => {
    socket.emit('api.socket.organik/s/getOrganikAll', (new_organik_all) => {
        return dispatch({ type: actionTypes.SET_ORGANIK, new_organik_all })
    })
}
export const setNewHandkey = (id_fingerprint, new_handkey_time) => dispatch => {
    return dispatch({ type: actionTypes.SET_NEW_HANDKEY, id_fingerprint, new_handkey_time })
}