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

const hotelModel = require('../models/hotelModel');

// Middleware to check if the request is for admin
function checkAdminLink(req, res, next) {
    if (req.path.startsWith('/admin')) {
        req.isAdmin = true;
    } else {
        req.isAdmin = false;
    }
    next();
}

// Apply the checkAdminLink middleware to the app
router.use(checkAdminLink);
// Neue Hotelbuchung erstellen (Admin only)
router.post('/admin', async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        const { HotelID, Name, Beschreibung, Bewertung, Buchungsdatum, CheckInDatum, CheckOutDatum, AnzahlGaeste, ZimmerTyp, Gesamtpreis } = req.body;

        const hotel = new hotelModel({
            HotelID,
            Name,
            Beschreibung,
            Bewertung,
            Buchungsdatum,
            CheckInDatum,
            CheckOutDatum,
            AnzahlGaeste,
            ZimmerTyp,
            Gesamtpreis
        });

        const newHotelBooking = await hotel.save();
        res.status(201).json(newHotelBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Alle Hotelbuchungen lesen (User and Admin)
router.get(['/admin', '/'], async (req, res) => {
    try {
        const hotels = await hotelModel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eine bestimmte Hotelbuchung auslesen (User and Admin)
router.get(['/admin/:HotelID', '/:HotelID'], getHotel, async (req, res) => {
    res.status(200).json(res.hotel);
});

// Eine Hotelbuchung löschen (Admin only)
router.delete('/admin/:HotelID', getHotel, async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        await res.hotel.deleteOne();
        res.status(200).json({ message: "Hotel erfolgreich gelöscht: " + req.params.HotelID });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eine Hotelbuchung aktualisieren (Admin only)
router.put('/admin/:HotelID', getHotel, async (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

    try {
        console.log("res.hotel:", res.hotel);  // Debugging-Log hinzufügen

        const { HotelID, Name, Beschreibung, Bewertung, Buchungsdatum, CheckInDatum, CheckOutDatum, AnzahlGaeste, ZimmerTyp, Gesamtpreis } = req.body;
        // Nur die Felder aktualisieren, die im Body der Anfrage vorhanden sind
        if (HotelID !== undefined) res.hotel.HotelID = HotelID;
        if (Name !== undefined) res.hotel.Name = Name;
        if (Beschreibung !== undefined) res.hotel.Beschreibung = Beschreibung;
        if (Bewertung !== undefined) res.hotel.Bewertung = Bewertung;
        if (Buchungsdatum !== undefined) res.hotel.Buchungsdatum = Buchungsdatum;
        if (CheckInDatum !== undefined) res.hotel.CheckInDatum = CheckInDatum;
        if (CheckOutDatum !== undefined) res.hotel.CheckOutDatum = CheckOutDatum;
        if (AnzahlGaeste !== undefined) res.hotel.AnzahlGaeste = AnzahlGaeste;
        if (ZimmerTyp !== undefined) res.hotel.ZimmerTyp = ZimmerTyp;
        if (Gesamtpreis !== undefined) res.hotel.Gesamtpreis = Gesamtpreis;

        // Sicherstellen, dass res.hotel ein Mongoose-Dokument ist
        const aktualisiertesHotel = await res.hotel.save();
        res.status(200).json(aktualisiertesHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware Funktion um eine bestimmte Hotelbuchung aus der Datenbank anhand ihrer ID auszulesen
async function getHotel(req, res, next) {
    try {
        const hotel = await hotelModel.findById(req.params.HotelID);
        if (!hotel) {
            return res.status(404).json({ message: 'Konnte kein Hotel mit der ID ' + req.params.HotelID + ' finden' });
        }
        res.hotel = hotel;
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