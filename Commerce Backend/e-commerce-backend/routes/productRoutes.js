const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../config/multerConfig'); 

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

router.post('/products/upload', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file.path;
        const { productId } = req.body;

        // Aggiorna il prodotto con l'URL dell'immagine
        const product = await Product.findByIdAndUpdate(productId, { imageUrl }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error uploading image:', error.message);
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
});

module.exports = router;
