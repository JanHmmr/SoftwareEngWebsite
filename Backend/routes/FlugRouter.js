const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

// Middleware für JSON-Verarbeitung
router.use(express.json());

const cors = require('cors');
router.use(cors());


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const ratingServer = process.env.RATINGMS;


const flugModel = require('../models/flugModel');

// Middleware to check if the request is for admin
function checkAdminLink(req, res, next) {
    if (req.path.startsWith('/admin')) {
        req.isAdmin = true;
    } else {
        req.isAdmin = false;
    }
    next();
}

// Middleware direkt auf den Router anwenden
router.use(checkAdminLink);

// (Admin only)
router.post('/admin', async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        const { FlugID, Abflugsort, Zielort, FlugDatum, Fluggesellschaft, Flugzeugtyp, Sitzplatznummer, Ticketpreis } = req.body;

        const flug = new flugModel({
            FlugID,
            Abflugsort,
            Zielort,
            FlugDatum,
            Fluggesellschaft,
            Flugzeugtyp,
            Sitzplatznummer,
            Ticketpreis
        });

        const newFlug = await flug.save();
        res.status(201).json(newFlug);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// (User and Admin)
router.get(['/', '/admin'], async (req, res) => {
    try {
        const fluege = await flugModel.find();
        res.status(200).json(fluege);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// (User and Admin)
router.get(['/:FlugID', '/admin/:FlugID'], getFlug, async (req, res) => {
    res.status(200).json(res.flug);
});
// (Admin only)
router.delete('/admin/:FlugID', getFlug, async (req, res) => {  // Change to FlugID
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        await res.flug.deleteOne();
        res.status(200).json({ message: "Flug erfolgreich gelöscht: " + req.params.FlugID });  // Change to FlugID
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// (Admin only)
router.put('/admin/:FlugID', getFlug, async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        console.log("res.flug:", res.flug);  // Debugging-Log hinzufügen

        const { Abflugsort, Zielort, FlugDatum, Fluggesellschaft, Flugzeugtyp, Sitzplatznummer, Ticketpreis } = req.body;
        // Nur die Felder aktualisieren, die im Body der Anfrage vorhanden sind
        if (Abflugsort !== undefined) res.flug.Abflugsort = Abflugsort;
        if (Zielort !== undefined) res.flug.Zielort = Zielort;
        if (FlugDatum !== undefined) res.flug.FlugDatum = FlugDatum;
        if (Fluggesellschaft !== undefined) res.flug.Fluggesellschaft = Fluggesellschaft;
        if (Flugzeugtyp !== undefined) res.flug.Flugzeugtyp = Flugzeugtyp;
        if (Sitzplatznummer !== undefined) res.flug.Sitzplatznummer = Sitzplatznummer;
        if (Ticketpreis !== undefined) res.flug.Ticketpreis = Ticketpreis;

        // Sicherstellen, dass res.flug ein Mongoose-Dokument ist
        const updatedFlug = await res.flug.save();
        res.status(200).json(updatedFlug);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getFlug(req, res, next) {
    try {
        const flug = await flugModel.findById(req.params.FlugID); // Change to FlugID
        if (!flug) {
            return res.status(404).json({ message: 'Konnte keinen Flug mit der ID ' + req.params.FlugID + " finden" });
        }
        res.flug = flug;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Alle Bewertungen zu einem bestimmten Flug vom RatingMS holen (User and Admin)
router.get(['/rating/:FlugID', '/admin/rating/:FlugID'], async (req, res) => {
    try {
        if (!ratingServer) {
            console.error("Rating-Server-URL ist nicht definiert in .env");
            return res.status(500).json({ message: "Rating-Server-URL ist nicht definiert in .env" });
        }
        const ratingAPIResponse = await fetch(ratingServer + req.params.FlugID);
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
