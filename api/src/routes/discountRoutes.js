const express = require('express');

const router = express.Router();

const discountController = require('../controllers/discountController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyAdmin } = require('../middleware/roleMiddleware');

// Rutas para discount
router.post('/', verifyToken, verifyAdmin, discountController.addDiscount);
router.put('/:id', verifyToken, verifyAdmin, discountController.updateDiscount);
router.delete('/:id', verifyToken, verifyAdmin, discountController.deleteDiscount);
router.get('/', discountController.getDiscounts);

module.exports = router;