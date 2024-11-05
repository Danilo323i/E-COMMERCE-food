const express = require('express');
const router = express.Router();

// Esempio di middleware per la gestione dell'autenticazione
const { loginUser, registerUser, verifyToken } = require('../controllers/authController');

// Route per il login
router.post('/login', (req, res) => {
    // Logica per il login (assicurati che `loginUser` sia implementata nel tuo controller)
    loginUser(req, res);
});

// Route per la registrazione
router.post('/register', (req, res) => {
    // Logica per la registrazione (assicurati che `registerUser` sia implementata nel tuo controller)
    registerUser(req, res);
});

// Route per la verifica del token (opzionale)
router.get('/verify', (req, res) => {
    // Logica per la verifica del token (assicurati che `verifyToken` sia implementata nel tuo controller)
    verifyToken(req, res);
});

module.exports = router;
