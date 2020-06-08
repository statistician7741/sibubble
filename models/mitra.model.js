var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MitraSchema = new Schema({
    "_id": String,
    "nama" : String,
    "nmjab" : String,
    "active" : {
        type: Boolean,
        default: true
    },
    "id_fingerprint": {
        type: String,
        default: '-'
    },
    "presensi":[{
        _id: String,
        date: Date,
        handkey_time: {
            type: [String],
            default: []
        }
    }],
    "isPpnpn": {
        type: Boolean,
        default: false
    }
}, { collection: 'mitra' });

module.exports = mongoose.model('Mitra', MitraSchema);