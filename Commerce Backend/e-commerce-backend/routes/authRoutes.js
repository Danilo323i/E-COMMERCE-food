const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const sendVerificationEmail = require("../utils/emailService"); // Assicurati di importare la funzione per l'email

// Registrazione
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se l'email esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email già registrata" });

    // Crittografa la password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea il nuovo utente
    const newUser = new User({ email, password: hashedPassword, isVerified: false });
    await newUser.save();

    // Genera un token di conferma
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Invia l'email di verifica
    sendVerificationEmail(email, token);

    res.status(201).json({ message: "Utente registrato. Controlla la tua email per confermare l’account." });
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
});


// Login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Utente non trovato" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Password errata" });
  
      if (!user.isVerified) return res.status(401).json({ message: "Verifica l'email per accedere" });
  
      // Genera un token JWT
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Errore nel server" });
    }
  });
  
  // Verifica dell'email
router.get("/verify", async (req, res) => {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Trova l'utente con l'email decodificata
      const user = await User.findOne({ email: decoded.email });
      if (!user) return res.status(400).json({ message: "Utente non trovato" });
  
      // Aggiorna lo stato dell'utente come verificato
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: "Account verificato con successo!" });
    } catch (error) {
      res.status(400).json({ message: "Token non valido o scaduto" });
    }
  });
  

module.exports = router;
