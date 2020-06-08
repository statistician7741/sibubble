var mongoose = require('mongoose');
const getMoment = require('../functions/clientServerValid.function').getMoment
const config = require('../config/env.config')

var Schema = mongoose.Schema;

var SPDSchema = new Schema({
    "_id": String,
    "nomor": Number,
    "reserved": {
        "seksi": {
            'type': String,
            'default': "IPDS"
        },
        "organik_nama": String,
        "seksi": String,
        "isFinal": {
            "type": Boolean,
            "default": false,
        },
        "timestamp": {
            'type': Date,
            'default': Date.now,
        }
    },
    "yang_bepergian": {
        nama: String,
        nip: String,
        pangkat: String,
        gol: String,
        jab: String,
    },
    "tujuan1": {
        lokasi: {
            type: String,
            ref: 'Kec'
        },
        tgl_selesai: {
            type: Date,
            set: (d) => (getMoment(d).toDate())
        }
    },
    "tujuan2": {
        lokasi: {
            type: String,
            ref: 'Kec'
        },
        tgl_selesai: {
            type: Date,
            set: (d) => (getMoment(d).toDate())
        }
    },
    "tujuan3": {
        lokasi: {
            type: String,
            ref: 'Kec'
        },
    },
    "maksud": String,
    "waktu": {
        "berangkat": {
            type: Date,
            set: (d) => (getMoment(d).startOf('day').toDate())
        },
        "kembali": {
            type: Date,
            set: (d) => (getMoment(d).endOf('day').toDate())
        }
    },
    "waktu_kec1_berangkat": Date,
    "waktu_kec2_tiba": Date,
    "tgl_buat_spd": Date,
    "ka_bps": {
        "nama": String,
        "jab": String,
        "_id": String
    },
    "ppk": {
        "nama": String,
        "_id": String
    },
    "kendaraan": String,
    "anggaran": String,
    "image": String,
    "penerima": {
        'type': [{
            "seksi": String,
            "nama": String,
            "maksud": {
                type: String,
                default: 'received'
            },
            "timestamp": {
                'type': Date,
                'default': Date.now
            }
        }],
        'default': []
    },
    "visum": {
        type: String,
        default: 'Responden yang Dikunjungi'
    },
    "visum2": {
        type: String,
        default: 'Tanggal dan Jam Kunjungan'
    },
    "tabel_jlh_baris": {
        type: Number,
        default: 3
    },
    "tabel_jlh_halaman": {
        type: Number,
        default: 1
    },
    'pages': [Number],
    'komponen': {
        type: String,
        ref: 'Komponen'
    },
    "sumber_anggaran": {
        'type': String,
        'default': "kab"
    },
    'kode_anggaran': {
        program: {
            type: String,
            default: ''
        },
        kegiatan: {
            type: String,
            default: ''
        },
        output: {
            type: String,
            default: ''
        },
        komponen: {
            type: String,
            default: ''
        }
    },
    'target': {
        jumlah: Number,
        satuan: String
    },
    "progress": [{
        time: Date,
        timestamp: Date,
        jumlah: {
            type: Number,
            default: 0
        },
        catatan: {
            jenis: [],
            text: String
        },
        bukti_foto: []

    }],
    "kinerja": {
        realisasi: {
            type: Number,
            default: 100
        },
        ketepatan: {
            type: Number,
            default: 100
        },
        kualitas: {
            type: Number,
            default: 100
        },
        kesungguhan: {
            type: Number,
            default: 100
        },
        administrasi: {
            type: Number,
            default: 100
        },
        realisasi_c: String,
        ketepatan_c: String,
        kualitas_c: String,
        kesungguhan_c: String,
        administrasi_c: String,
    },
    "kinerja_committed": {
        type: Boolean,
        default: false
    },
    "kinerja_approved": {
        type: Boolean,
        default: false
    },
    "isSudahDibayar": {
        type: Boolean,
        default: false
    },
    "isSudahBuatRekap": {
        type: Boolean,
        default: false
    },
    "jenis_spd": {
        type: String,
        default: 'biasa'
    },
    "dasar": String,
    "anggota": [],
    "untuk": String,
    "no_ka": {
        type: Boolean,
        default: false
    }
}, { collection: 'spd' });

SPDSchema.virtual('tujuan').get(function () {
    let tujuan = []
    if (this.tujuan1) this.tujuan1.lokasi && tujuan.push(this.tujuan1.lokasi.kec.nama)
    if (this.tujuan2) this.tujuan2.lokasi && tujuan.push(this.tujuan2.lokasi.kec.nama)
    if (this.tujuan3) this.tujuan3.lokasi && tujuan.push(this.tujuan3.lokasi.kec.nama)
    if (tujuan.length === 2) return `${tujuan[0]} dan ${tujuan[1]}`
    else return tujuan.join(', ')
});
SPDSchema.virtual('ppk_bps').get(function () {
    return this.sumber_anggaran === 'kab' ? `BPS ${config.kab}` : `BPS Provinsi ${config.prov}`
});
SPDSchema.virtual('is_kab').get(function () {
    return this.sumber_anggaran === 'kab';
});
SPDSchema.virtual('kab').get(function () {
    return config.kab
});
SPDSchema.virtual('kode_kab').get(function () {
    return config.kode_kab
});
SPDSchema.virtual('ttd_lokasi').get(function () {
    return config.ttd_lokasi
});
SPDSchema.virtual('ibukota_bps_kab').get(function () {
    return config.ibukota_bps_kab
});
SPDSchema.virtual('alamat_bps_kab').get(function () {
    return config.alamat_bps_kab
});
SPDSchema.virtual('telp_fax_bps_kab').get(function () {
    return config.telp_fax_bps_kab
});
SPDSchema.virtual('homepage_bps_kab').get(function () {
    return config.homepage_bps_kab
});
SPDSchema.virtual('email_bps_kab').get(function () {
    return config.email_bps_kab
});
function dummyArr(jumlah) {
    let baris = []
    for (let index = 0; index < jumlah; index++) {
        baris.push({loop: index, last: (index === jumlah-1)?true:false})
    }
    return baris
}
SPDSchema.virtual('bv').get(function () {
    return dummyArr(this.tabel_jlh_baris)
});
SPDSchema.virtual('halaman_visum').get(function () {
    return dummyArr(this.tabel_jlh_halaman)
});
SPDSchema.virtual('baris_more_4').get(function () {
    return this.tabel_jlh_baris > 4
});
SPDSchema.virtual('baris_less_5').get(function () {
    return this.tabel_jlh_baris < 5
});
SPDSchema.virtual('page_break').get(function () {
    return '<w:p><w:r><w:t></w:t></w:r>' +
        '</w:p><w:p><w:br w:type="page" /></w:p>' +
        '<w:p><w:r><w:t></w:t></w:r></w:p>'
});
SPDSchema.virtual('akun').get(function () {
    return this.anggaran?(this.anggaran.match(/52411\d{1}/)?this.anggaran.match(/52411\d{1}/)[0]:'524113'):'524113';
});

module.exports = mongoose.model('SPD', SPDSchema);