const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const productRoutes = require('../e-commerce-backend/routes/productRoutes');

// Configurazione ambiente
dotenv.config();

// Creazione dell'app Express
const app = express();

// Middleware
app.use(express.json()); // Per gestire i body delle richieste JSON
app.use(cors()); // Per abilitare richieste cross-origin
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});
app.use('/api', productRoutes);

// Connessione al database MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connesso al database MongoDB'))
.catch((err) => console.error('Errore di connessione al database:', err));

// Utilizzo delle route
app.use('/auth', authRoutes);

// Route di base per controllare il funzionamento del server
app.get('/', (req, res) => {
    res.send('Benvenuto nel backend dell\'e-commerce!');
});

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});
