const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin, isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// Rutas de los pedidos
router.post('/:userId', verifyToken, isOwnerOrAdmin, orderController.addOrder);
router.get('/', verifyToken, verifyAdmin, orderController.getAllOrders);
router.get('/:userId', verifyToken, isOwnerOrAdmin, orderController.getOrder);
router.put('/:orderId', verifyToken, verifyAdmin, orderController.updateEstado);

module.exports = router;