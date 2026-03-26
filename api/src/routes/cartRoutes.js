const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isOwnerOrAdmin } = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Obtener carrito del usuario
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *       400:
 *         description: Error al obtener el carrito

 *   delete:
 *     summary: Vaciar carrito
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 *       400: 
 *          description: Error al vaciar el carrito
 *
 * /api/cart/{userId}/items:
 *   post:
 *     summary: Añadir item al carrito
 *     tags: [Cart]
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
 *             $ref: '#/components/schemas/CartAddItemRequest'
 *     responses:
 *       200:
 *         description: Item añadido correctamente
 *       400:
 *         description: Error al añadir el item
 *
 * /api/cart/{userId}/items/{itemId}:
 *   put:
 *     summary: Actualizar cantidad de un item del carrito
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartUpdateItemRequest'
 *     responses:
 *       200:
 *         description: Item actualizado correctamente
 *       400:
 *         description: Error al actualizar el item
 *   delete:
 *     summary: Eliminar item del carrito
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Item eliminado correctamente
 *       400:
 *         description: Error al eliminar el item
 */

router.get('/:userId', verifyToken, isOwnerOrAdmin, cartController.getCart);
router.post('/:userId/items', verifyToken, isOwnerOrAdmin, cartController.addItem);
router.put('/:userId/items/:itemId', verifyToken, isOwnerOrAdmin, cartController.updateItem);
router.delete('/:userId/items/:itemId', verifyToken, isOwnerOrAdmin, cartController.removeItem);
router.delete('/:userId', verifyToken, isOwnerOrAdmin, cartController.vaciarCart);

module.exports = router;