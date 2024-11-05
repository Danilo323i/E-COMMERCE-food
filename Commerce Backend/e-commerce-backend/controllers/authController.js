// controllers/authController.js
exports.loginUser = (req, res) => {
    // Logica per il login
    res.send('Login eseguito');
};

exports.registerUser = (req, res) => {
    // Logica per la registrazione
    res.send('Utente registrato');
};

exports.verifyToken = (req, res) => {
    // Logica per la verifica del token
    res.send('Token verificato');
};
