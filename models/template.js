var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MaksudSchema = new Schema({
    "text": String,
    "timestamp": {
        'type': Date,
        'default': Date.now
    }
}, { collection: 'maksud' });

module.exports = mongoose.model('Maksud', MaksudSchema);