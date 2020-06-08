// import * as actionTypes from "../types/organik.type";

export const serveLastNomorSPD =  async (socket) => {
    socket.emit('api.socket.spd/s/serveLastNomorSPD', (servedLastNomorSPD) => {
        console.log(servedLastNomorSPD);
        return servedLastNomorSPD
    })
}