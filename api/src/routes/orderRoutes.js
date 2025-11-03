const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');

// Rutas de los pedidos
router.post('/:userId', orderController.addOrder);
router.get('/', orderController.getAllOrders);
router.get('/:userId', orderController.getOrder);
router.put('/:orderId', orderController.updateEstado);

module.exports = router;