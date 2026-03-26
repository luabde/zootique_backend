const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin, isOwnerOrAdmin } = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener pedidos (admin)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Pedidos encontrados
 *
 * /api/orders/{userId}:
 *   get:
 *     summary: Obtener pedidos de un usuario
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Pedido(s) encontrados
 *   post:
 *     summary: Crear pedido para un usuario
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreateRequest'
 *     responses:
 *       200:
 *         description: Pedido creado correctamente
 *       400:
 *         description: Error al crear pedido
 *
 * /api/orders/{orderId}:
 *   put:
 *     summary: Actualizar estado de un pedido (admin)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstadoPedidoUpdateRequest'
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado correctamente
 *       400:
 *         description: Error al actualizar estado
 */

// Rutas de los pedidos
router.post('/:userId', verifyToken, isOwnerOrAdmin, orderController.addOrder);
router.get('/', verifyToken, verifyAdmin, orderController.getAllOrders);
router.get('/:userId', verifyToken, isOwnerOrAdmin, orderController.getOrder);
router.put('/:orderId', verifyToken, verifyAdmin, orderController.updateEstado);

module.exports = router;