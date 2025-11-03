const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

// Cuando se llame a este fichero, y la url sea la raiz (api/products) se llamara a la función del controlador createProduct
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/', productController.readProduct);
router.get('/:id', productController.readProductById);

// Rutas para discount
router.post('/:id/discounts/:discountId', productController.addDiscountToProd); // se pone el discountId, porque el descuento ya estara creado cuando se quira añadir al prod
router.delete('/:id/discounts/:discountId', productController.removeDiscountFromProd);
router.get('/:id/discounts', productController.getDiscounts);

module.exports = router;