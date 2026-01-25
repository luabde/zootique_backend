const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCart);
router.post('/:userId/items', cartController.addItem);
router.put('/:userId/items/:itemId', cartController.updateItem);
router.delete('/:userId/items/:itemId', cartController.removeItem);
router.delete('/:userId', cartController.vaciarCart);

module.exports = router;