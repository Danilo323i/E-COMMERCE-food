const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

module.exports = router;
