const express = require('express');
const mongoose = require('mongoose');
const flugRouter = require('../routes/FlugRouter');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Verbindung zur Datenbank hergestellt'));

app.use('/', flugRouter);
app.listen(process.env.PORT_FLUG, () => console.log(`Flug Server läuft auf Port ${process.env.PORT_FLUG}`));
