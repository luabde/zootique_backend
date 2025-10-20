const productService = require('../services/productService');

// Función para crear un producto, se usará el servicio de producto, y la res, correpspondra a si ha estado correcta la creación o no
const createProduct = async (req, res) => {
    try{
        const product = await productService.createProduct(req.body);
        res.status(201).json({status: 'success', data: product});
    }catch(error){
        res.status(400).json({status: 'error', message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await productService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch(error){
        res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const updated = await productService.updateProduct(id, req.body);

        if(!updated){
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        res.status(200).json({ status: 'success', data: updated });
    }catch(error){
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const readProduct = async (req, res) => {
    try{
        const products = await productService.readProduct();
        res.status(200).json({ status: 'success', data: products });

    }catch(error){
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const readProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await productService.readProductById(id);
    
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
    
        res.status(200).json({ status: 'success', data: product });
    }catch(error){
        res.status(400).json({ status: 'error', message: error.message });
    }

}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    readProduct,
    readProductById
}