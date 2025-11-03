const express = require('express');

const router = express.Router();

const discountController = require('../controllers/discountController');

// Rutas para discount
router.post('/', discountController.addDiscount);
router.put('/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);
router.get('/', discountController.getDiscounts);

module.exports = router;