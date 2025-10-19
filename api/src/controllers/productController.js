const productService = require('../services/productService');

// Función para crear un producto, se usará el servicio de producto, y la res, correpspondra a si ha estado correcta la creación o no
const createProduct = async (req, res) => {
    try{
        const product = await productService.createProduct(req.body);
        res.status(201).json({status: 'success', data: product});
    }catch{
        res.status(400).json({status: 'error', message: error.message});
    }
};

module.exports = {
    createProduct,
}