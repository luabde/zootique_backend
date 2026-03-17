const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// Rutas para la autenticación de usuarios
router.post('/registrar', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
