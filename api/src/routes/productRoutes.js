const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

// Cuando se llame a este fichero, y la url sea la raiz (api/products) se llamara a la función del controlador createProduct
router.post('/', productController.createProduct);

module.exports = router;