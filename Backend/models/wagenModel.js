const mongoose = require('mongoose');

const wagenModelSchema = new mongoose.Schema({
    WagenID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Beschreibung: {
        type: String,
        required: true
    },
    Preis: {
        type: Number,
        required: true
    },
    Verfuegbarkeit: {
        type: Boolean,
        required: true
    },
    Standort: {
        type: String,
        required: true
    },
    Kilometerstand: {
        type: Number,
        required: true
    },
    Baujahr: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('wagenModel', wagenModelSchema);
