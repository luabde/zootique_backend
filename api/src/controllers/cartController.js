const cartService = require('../services/cartService');

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await cartService.getCart(userId);
        return res.status(200).json({ status: 'success', data: cart });
    } catch (err) {
        return res.status(400).json({ status: 'error', message: err.message });
    }
};

const addItem = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, cantidad } = req.body;

        const cart = await cartService.addItemCart(userId, productId, cantidad);
        return res.status(200).json({ status: 'success', data: cart });
    } catch (err) {
        return res.status(400).json({ status: 'error', message: err.message });
    }
};

const removeItem = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const cart = await cartService.removeItemCart(userId, itemId);
        return res.status(200).json({ status: 'success', data: cart });
    } catch (err) {
        return res.status(400).json({ status: 'error', message: err.message });
    }
};

const vaciarCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await cartService.vaciarCart(userId);
        return res.status(200).json({ status: 'success', data: cart });
    } catch (err) {
        return res.status(400).json({ status: 'error', message: err.message });
    }
};

    const updateItem = async (req, res) => {
        try {
            const { userId, itemId } = req.params;
            const { cantidad } = req.body;

            const cart = await cartService.updateItemCart(userId, itemId, cantidad);
            return res.status(200).json({ status: 'success', data: cart });
        } catch (err) {
            return res.status(400).json({ status: 'error', message: err.message });
        }
    };

module.exports = {
    getCart,
    addItem,
    removeItem,
    vaciarCart,
    updateItem
};