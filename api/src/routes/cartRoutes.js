const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isOwnerOrAdmin } = require('../middleware/roleMiddleware');

router.get('/:userId', verifyToken, isOwnerOrAdmin, cartController.getCart);
router.post('/:userId/items', verifyToken, isOwnerOrAdmin, cartController.addItem);
router.put('/:userId/items/:itemId', verifyToken, isOwnerOrAdmin, cartController.updateItem);
router.delete('/:userId/items/:itemId', verifyToken, isOwnerOrAdmin, cartController.removeItem);
router.delete('/:userId', verifyToken, isOwnerOrAdmin, cartController.vaciarCart);

module.exports = router;