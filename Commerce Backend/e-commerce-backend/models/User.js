const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assicurati di avere un modello User definito

exports.registerUser = async (req, res) => {
    try {
        const { email, password, userName } = req.body;

        // Verifica se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Utente già registrato' });
        }

        // Crea un nuovo utente
        const newUser = new User({ email, password, userName });
        await newUser.save();

        res.status(201).json({ message: 'Registrazione avvenuta con successo' });
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ message: 'Errore durante la registrazione' });
    }
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model('User', UserSchema);
