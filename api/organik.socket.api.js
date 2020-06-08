const Organik = require('../models/organik.model')
const Mitra = require('../models/mitra.model')
const moment = require('moment');

function applyToClient(client) {
    client.on('api.socket.organik/s/getOrganikAll', (cb) => {
        const _id = moment().format('YYYY_MM_DD')
        const _id_prev_day = moment().subtract(1,'day').format('YYYY_MM_DD')
        console.log(_id, _id_prev_day);
        Organik.updateMany({
            'isProv': false,
            '$and': [
                { pensiun: false },
                { pindah: false }
            ],
            'presensi._id': {
                $nin: [_id]
            }
        }, {
            $push: {
                presensi: {
                    _id,
                    handkey_time: []
                }
            }
        }, (e, r) => {
            Organik.aggregate([
                { $unwind: "$presensi" },
                {
                    $match: {
                        "presensi._id": _id,
                        'isProv': false,
                        '$and': [
                            { pensiun: false },
                            { pindah: false }
                        ]

                    }
                }
            ]).sort('nama').exec((e, semua_organik) => {
                if (semua_organik) {
                    Mitra.updateMany({
                        'isPpnpn': true,
                        'presensi._id': {
                            $nin: [_id]
                        }
                    }, {
                        $push: {
                            presensi: {
                                _id,
                                handkey_time: []
                            }
                        }
                    }, (e, r) => {
                        Mitra.updateMany({
                            'isPpnpn': true,
                            'presensi._id': {
                                $nin: [_id_prev_day]
                            }
                        }, {
                            $push: {
                                presensi: {
                                    _id_prev_day,
                                    handkey_time: []
                                }
                            }
                        }, (e, r) => {
                            Mitra.find({
                                'isPpnpn': true,
                                'presensi': { "$elemMatch":{"_id":{"$in":[ _id, _id_prev_day ]}  }}

                            }).sort('nama').exec((e, semua_mitra) => {
                                // console.log(semua_mitra);
                                if (semua_mitra) cb(semua_organik.concat(semua_mitra))
                                // if (semua_mitra) cb(semua_organik)
                                else cb([])
                            })
                        })
                    })
                }
                else cb([])
            })
        })
    });
}

module.exports = applyToClient