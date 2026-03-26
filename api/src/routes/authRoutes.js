const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/registrar:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación o usuario existente
 *
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logueado correctamente
 *       400:
 *         description: Credenciales incorrectas
 *
 * /api/auth/refresh-token:
 *   post:
 *     summary: Renovar access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token renovado correctamente
 *       401:
 *         description: No hay refresh token / inválido
 *
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *       400:
 *         description: Error al cerrar sesión
 */

// Rutas para la autenticación de usuarios
router.post('/registrar', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
