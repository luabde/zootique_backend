const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin, isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// La ruta principal es /api/users

// Rutas para los usuarios
router.post('/', verifyToken, verifyAdmin, userController.createUser);
router.delete('/:id', verifyToken, isOwnerOrAdmin, userController.deleteUser);
router.put('/:id', verifyToken, isOwnerOrAdmin, userController.updateUser);
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);
router.get('/:id', verifyToken, isOwnerOrAdmin, userController.getUserById);

// Rutas para direcciones
router.post('/:id/direcciones', verifyToken, isOwnerOrAdmin, userController.addDirection);
router.put('/:id/direcciones/:direccionId', verifyToken, isOwnerOrAdmin, userController.updateDirection);
router.delete('/:id/direcciones/:direccionId', verifyToken, isOwnerOrAdmin, userController.deleteDirection);

// Rutas para metodos pago
router.get('/:id/metodos-pago', verifyToken, isOwnerOrAdmin, userController.getMetodosPago);
router.post('/:id/metodos-pago', verifyToken, isOwnerOrAdmin, userController.addMetodoPago);
router.put('/:id/metodos-pago/:metodoId', verifyToken, isOwnerOrAdmin, userController.updateMetodoPago);

// Rutas para los puntos
router.post('/:id/puntos/add', verifyToken, verifyAdmin, userController.addPuntos);
router.post('/:id/puntos/remove', verifyToken, verifyAdmin, userController.removePuntos);
router.get('/:id/puntos', verifyToken, isOwnerOrAdmin, userController.getPuntos);

// Rutas para favoritos
router.post('/:id/favoritos/:productoId', verifyToken, isOwnerOrAdmin, userController.addFavorito);
router.delete('/:id/favoritos/:productoId', verifyToken, isOwnerOrAdmin, userController.removeFavorito);
router.get('/:id/favoritos', verifyToken, isOwnerOrAdmin, userController.getFavoritos);

module.exports = router;