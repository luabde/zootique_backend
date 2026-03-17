const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/roleMiddleware');

// Cuando se llame a este fichero, y la url sea la raiz (api/products) se llamara a la función del controlador createProduct
router.post('/', verifyToken, verifyAdmin, productController.createProduct);
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);
router.put('/:id', verifyToken, verifyAdmin, productController.updateProduct);
router.get('/', productController.readProduct);
router.get('/:id', productController.readProductById);

// Rutas para discount
router.post('/:id/discounts/:discountId', verifyToken, verifyAdmin, productController.addDiscountToProd); // se pone el discountId, porque el descuento ya estara creado cuando se quira añadir al prod
router.delete('/:id/discounts/:discountId', verifyToken, verifyAdmin, productController.removeDiscountFromProd);
router.get('/:id/discounts', productController.getDiscounts);

module.exports = router;