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
app.use(cors());
app.use(express.json());

// Middleware
app.use(logger);

// Routes
app.use('/auth', authRoutes);
app.use('/api', productRoutes);

// Error handlers
app.use(badRequestHandler);
app.use(genericErrorHandler);
app.use(notFound);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
