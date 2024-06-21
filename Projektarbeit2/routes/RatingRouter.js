const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

// Middleware für JSON-Verarbeitung
router.use(express.json());

const cors = require('cors');
router.use(cors());

const ratingModel = require('../models/ratingModel');

// Middleware to check if the request is for admin
function checkAdminLink(req, res, next) {
    if (req.path.startsWith('/admin')) {
        req.isAdmin = true;
    } else {
        req.isAdmin = false;
    }
    next();
}

router.use(checkAdminLink);

// Neue Bewertung erstellen (User and Admin)
router.post(['/', '/admin'], async (req, res) => {
    try {
        const { ElementID, typ, bewertung, beschreibung, userName } = req.body;
        const rating = new ratingModel({ ElementID, typ, bewertung, beschreibung, userName });
        const savedRating = await rating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Alle Bewertungen abrufen (Admin only)
router.get('/admin', async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    try {
        const ratings = await ratingModel.find();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Alle Benutzernamen abrufen (Admin only)
router.get('/admin/usernames', async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    try {
        const usernames = await ratingModel.distinct('userName');
        res.status(200).json(usernames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bewertungen des angegebenen Benutzers abrufen (User only)
router.get('/:userName', async (req, res) => {
    try {
        const { userName } = req.params;
        const ratings = await ratingModel.find({ userName });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ein bestimmtes Rating auslesen (User and Admin)
router.get(['/:id', '/admin/:id'], getRating, async (req, res) => {
    if (!req.isAdmin && res.rating.userName !== req.body.userName) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    res.status(200).json(res.rating);
});

// Rating löschen (Admin and Owner)
router.delete(['/:id', '/admin/:id'], getRating, async (req, res) => {
    if (!req.isAdmin && res.rating.userName !== req.body.userName) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        await ratingModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Rating erfolgreich gelöscht: " + req.params.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ein Rating aktualisieren (Admin and Owner)
router.put(['/:id', '/admin/:id'], getRating, async (req, res) => {
    if (!req.isAdmin && res.rating.userName !== req.body.userName) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { ElementID, typ, bewertung, beschreibung } = req.body;

        if (ElementID !== undefined) res.rating.ElementID = ElementID;
        if (typ !== undefined) res.rating.typ = typ;
        if (bewertung !== undefined) res.rating.bewertung = bewertung;
        if (beschreibung !== undefined) res.rating.beschreibung = beschreibung;

        const updatedRating = await res.rating.save();
        res.status(200).json(updatedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ratings zu einem Objekt holen anhand der ID des Objekt (User and Admin)
router.get(['/muster/:id', '/admin/muster/:id'], async (req, res) => {
    try {
        const ratings = await ratingModel.find({ ElementID: req.params.id });
        if (ratings.length === 0) {
            return res.status(404).json({ message: "Keine Ratings gefunden" });
        }
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware Funktion um ein bestimmtes Rating aus der Datenbank anhand seiner ID auszulesen
async function getRating(req, res, next) {
    try {
        const rating = await ratingModel.findById(req.params.id);
        if (rating == null) {
            return res.status(404).json({ message: 'Konnte kein Rating mit der ID ' + req.params.id + " finden" });
        }
        res.rating = rating;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
