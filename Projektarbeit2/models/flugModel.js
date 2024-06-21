const mongoose = require('mongoose');

const flugModelSchema = new mongoose.Schema({
    FlugID: {
        type: String,
        required: true
    },
    Abflugsort: {
        type: String,
        required: true
    },
    Zielort: {
        type: String,
        required: true
    },
    FlugDatum: {
        type: Date,
        required: true
    },
    Fluggesellschaft: {
        type: String,
        required: true
    },
    Flugzeugtyp: {
        type: String,
        required: true
    },
    Sitzplatznummer: {
        type: String,
        required: true
    },
    Ticketpreis: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('flugModel', flugModelSchema);
