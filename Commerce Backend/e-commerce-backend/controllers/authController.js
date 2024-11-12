const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifica che tutti i campi siano presenti
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Controlla se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuovo utente
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Invia email di benvenuto (opzionale)
        await sendEmail(user.email, 'Benvenuto!', '<h1>Grazie per esserti registrato!</h1>');

        // Crea un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered', token });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Controlla che almeno email/username e password siano presenti
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: 'Email/Username and password are required' });
        }

        // Trova l'utente tramite email o username
        const user = await User.findOne({ 
            $or: [{ email: email }, { username: username }] 
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Verifica la correttezza della password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Genera un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
