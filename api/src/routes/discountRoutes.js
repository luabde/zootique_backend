const express = require('express');

const router = express.Router();

const discountController = require('../controllers/discountController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/discounts:
 *   get:
 *     summary: Obtener lista de descuentos
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: Lista de descuentos
 *       400:
 *         description: Error al obtener los descuentos
 *   post:
 *     summary: Crear descuento
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountCreateRequest'
 *     responses:
 *       200:
 *         description: Descuento creado correctamente
 *       400:
 *         description: Error al crear el descuento
 *
 * /api/discounts/{id}:
 *   put:
 *     summary: Actualizar descuento
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountUpdateRequest'
 *     responses:
 *       200:
 *         description: Descuento actualizado correctamente
 *       400:
 *         description: Error al actualizar el descuento
 *   delete:
 *     summary: Eliminar descuento
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Descuento eliminado correctamente
 *       400:
 *         description: Error al eliminar el descuento
 */


// Rutas para discount
router.post('/', verifyToken, verifyAdmin, discountController.addDiscount);
router.put('/:id', verifyToken, verifyAdmin, discountController.updateDiscount);
router.delete('/:id', verifyToken, verifyAdmin, discountController.deleteDiscount);
router.get('/', discountController.getDiscounts);

module.exports = router;