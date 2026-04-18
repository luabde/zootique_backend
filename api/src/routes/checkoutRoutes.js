const express = require('express');
const router = express.Router();

const checkoutController = require('../controllers/checkoutController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create-session', verifyToken, checkoutController.createSession);

module.exports = router;