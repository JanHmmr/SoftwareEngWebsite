const mongoose = require('mongoose');

const hotelModelSchema = new mongoose.Schema({
    HotelID: {
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
    Bewertung: {
        type: Number,
        required: true
    },
    Buchungsdatum: {
        type: Date,
        required: true
    },
    CheckInDatum: {
        type: Date,
        required: true
    },
    CheckOutDatum: {
        type: Date,
        required: true
    },
    AnzahlGaeste: {
        type: Number,
        required: true
    },
    ZimmerTyp: {
        type: String,
        required: true
    },
    Gesamtpreis: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('hotelModel', hotelModelSchema);
