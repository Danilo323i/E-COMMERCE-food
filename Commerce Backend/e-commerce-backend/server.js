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

const app = express();

// Configurazione CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permette le richieste dal frontend su questa origine
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());

// Middleware
app.use(logger);

// Rotte
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);

// Gestione degli errori
app.use(badRequestHandler);
app.use(genericErrorHandler);
app.use(notFound);

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
