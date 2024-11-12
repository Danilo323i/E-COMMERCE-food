const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Rotta per la registrazione
router.post('/register', registerUser);

// Rotta per il login
router.post('/login', loginUser);

module.exports = router;
