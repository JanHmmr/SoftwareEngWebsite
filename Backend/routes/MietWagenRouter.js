const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const router = express.Router();

// Middleware für JSON-Verarbeitung
app.use(express.json());

const cors = require('cors');
app.use(cors());

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ratingServer = process.env.RATINGMS;

const wagenModel = require('../models/wagenModel');

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

// Neue Wagenbuchung erstellen (Admin only)
router.post('/admin', async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        const { WagenID, Name, Beschreibung, Preis, Verfuegbarkeit, Standort, Kilometerstand, Baujahr } = req.body;

        const wagen = new wagenModel({
            WagenID,
            Name,
            Beschreibung,
            Preis,
            Verfuegbarkeit,
            Standort,
            Kilometerstand,
            Baujahr
        });

        const neueWagenBuchung = await wagen.save();
        res.status(201).json(neueWagenBuchung);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Alle Wagenbuchungen lesen (User and Admin)
router.get(['/', '/admin'], async (req, res) => {
    try {
        const buchungen = await wagenModel.find();
        res.status(200).json(buchungen);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eine bestimmte Wagenbuchung auslesen (User and Admin)
router.get(['/:id', '/admin/:id'], getBuchung, async (req, res) => {
    res.status(200).json(res.buchung);
});

// Eine Wagenbuchung löschen (Admin only)
router.delete('/admin/:id', getBuchung, async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        await res.buchung.deleteOne();
        res.status(200).json({ message: "Buchung erfolgreich gelöscht: " + req.params.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eine Wagenbuchung aktualisieren (Admin only)
router.put('/admin/:id', getBuchung, async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        const { WagenID, Name, Beschreibung, Preis, Verfuegbarkeit, Standort, Kilometerstand, Baujahr } = req.body;
        // Nur die Felder aktualisieren, die im Body der Anfrage vorhanden sind
        if (WagenID !== undefined) res.buchung.WagenID = WagenID;
        if (Name !== undefined) res.buchung.Name = Name;
        if (Beschreibung !== undefined) res.buchung.Beschreibung = Beschreibung;
        if (Preis !== undefined) res.buchung.Preis = Preis;
        if (Verfuegbarkeit !== undefined) res.buchung.Verfuegbarkeit = Verfuegbarkeit;
        if (Standort !== undefined) res.buchung.Standort = Standort;
        if (Kilometerstand !== undefined) res.buchung.Kilometerstand = Kilometerstand;
        if (Baujahr !== undefined) res.buchung.Baujahr = Baujahr;

        // Sicherstellen, dass res.buchung ein Mongoose-Dokument ist
        const aktualisierteBuchung = await res.buchung.save();
        res.status(200).json(aktualisierteBuchung);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware Funktion um eine bestimmte Wagenbuchung aus der Datenbank anhand ihrer ID auszulesen
async function getBuchung(req, res, next) {
    try {
        const buchung = await wagenModel.findById(req.params.id);
        if (!buchung) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.buchung = buchung;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Alle Bewertungen zu einer bestimmten Hotelbuchung vom RatingMS holen (User and Admin)
router.get(['/rating/:HotelID', '/admin/rating/:HotelID'], async (req, res) => {
    try {
        if (!ratingServer) {
            console.error("Rating-Server-URL ist nicht definiert in .env");
            return res.status(500).json({ message: "Rating-Server-URL ist nicht definiert in .env" });
        }
        const ratingAPIResponse = await fetch(ratingServer + req.params.HotelID);
        if (!ratingAPIResponse.ok) {
            throw new Error(`Error fetching ratings: ${ratingAPIResponse.statusText}`);
        }
        const ratings = await ratingAPIResponse.json();
        res.status(200).json(ratings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

// Middleware für nicht definierte Routen
router.use((req, res) => {
    res.status(403).json({ message: 'Forbidden' });
});

module.exports = router;