const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const badRequestHandler = require('./middlewares/badRequestHandler');
const genericErrorHandler = require('./middlewares/genericErrorHandler');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/routeNotFound');

dotenv.config();

// Creazione dell'app Express
const app = express();

// Middleware
app.use(express.json()); // Per gestire i body delle richieste JSON
app.use(cors()); // Per abilitare richieste cross-origin
app.use(logger); // Middleware di logging

// Utilizzo delle route
app.use('/auth', authRoutes);
app.use('/api', productRoutes);

// Route di base per controllare il funzionamento del server
app.get('/', (req, res) => {
    res.send('Benvenuto nel backend dell\'e-commerce!');
});

// Middleware per gestire le route non trovate
app.use(notFound);

// Middleware per la gestione degli errori
app.use(badRequestHandler);
app.use(genericErrorHandler);

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
