const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/roleMiddleware');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener lista de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       400:
 *         description: Error al leer productos
 *   post:
 *     summary: Crear producto (admin)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateRequest'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Se requiere rol de administrador
 *       400:
 *         description: Error al crear el producto
 *
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al leer producto
 *   put:
 *     summary: Actualizar producto (admin)
 *     tags: [Products]
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
 *             $ref: '#/components/schemas/ProductUpdateRequest'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Se requiere rol de administrador
 *       400:
 *         description: Error de validación
 *   delete:
 *     summary: Eliminar producto (admin)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Se requiere rol de administrador
 *       400:
 *         description: Error al eliminar producto
 *
 * /api/products/{id}/discounts:
 *   get:
 *     summary: Obtener descuentos asociados a un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Lista de descuentos
 *       400:
 *         description: Error al leer descuentos
 *
 * /api/products/{id}/discounts/{discountId}:
 *   post:
 *     summary: Añadir descuento a producto (admin)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *       - in: path
 *         name: discountId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Descuento añadido correctamente
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Se requiere rol de administrador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Error al añadir descuento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Eliminar descuento de producto (admin)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *       - in: path
 *         name: discountId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ObjectId'
 *     responses:
 *       200:
 *         description: Descuento eliminado correctamente
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Se requiere rol de administrador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Error al eliminar descuento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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