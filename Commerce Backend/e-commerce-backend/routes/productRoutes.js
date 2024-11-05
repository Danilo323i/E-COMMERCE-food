const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assicurati di avere un modello Product definito

// Route per ottenere tutti i prodotti
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); // Recupera i prodotti dal database
        res.status(200).json(products); // Risponde con i prodotti in formato JSON
    } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
        res.status(500).json({ message: 'Errore nel recupero dei prodotti' });
    }
});

// Route per ottenere un prodotto specifico tramite ID (opzionale)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Prodotto non trovato' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Errore nel recupero del prodotto:', error);
        res.status(500).json({ message: 'Errore nel recupero del prodotto' });
    }
});

// Esporta il router per essere utilizzato in server.js
module.exports = router;
