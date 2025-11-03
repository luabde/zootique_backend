const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// La ruta principal es /api/users

// Rutas para los usuarios
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Rutas para direcciones
router.post('/:id/direcciones', userController.addDirection);
router.put('/:id/direcciones/:direccionId', userController.updateDirection);
router.delete('/:id/direcciones/:direccionId', userController.deleteDirection);

// Rutas para metodos pago
router.get('/:id/metodos-pago', userController.getMetodosPago);
router.post('/:id/metodos-pago', userController.addMetodoPago);
router.put('/:id/metodos-pago/:metodoId', userController.updateMetodoPago);

// Rutas para los puntos
router.post('/:id/puntos/add', userController.addPuntos);
router.post('/:id/puntos/remove', userController.removePuntos);
router.get('/:id/puntos', userController.getPuntos);

// Rutas para favoritos
router.post('/:id/favoritos/:productoId', userController.addFavorito);
router.delete('/:id/favoritos/:productoId', userController.removeFavorito);
router.get('/:id/favoritos', userController.getFavoritos);

module.exports = router;