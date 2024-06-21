const express = require('express');
const cors = require('cors');
const hotelRouter = require('../routes/HotelRouter');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Verbindung zur Datenbank hergestellt'));

app.use('/', hotelRouter);

const PORT_HOTEL = process.env.PORT_HOTEL || 3000;
app.listen(PORT_HOTEL, () => {
    console.log(`Hotel Server läuft auf Port ${PORT_HOTEL}`);
});
