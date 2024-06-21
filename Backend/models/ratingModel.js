const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    ElementID: {
        type: String,
        required: true
    },
    typ: {
        type: String,
        enum: ['Mietwagen', 'Flug', 'Hotel'],
        required: true
    },
    bewertung: {
        type: Number,
        required: true
    },
    beschreibung: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ratingModel', ratingSchema);
