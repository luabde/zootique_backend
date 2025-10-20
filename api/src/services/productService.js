const Product = require('../models/product');

const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
}

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, {
    new: true, // devuelve el producto actualizado
    runValidators: true // valida según el esquema
  });
};

const readProduct = async () => {
    return await Product.find();
};

const readProductById = async (id) => {
  return await Product.findById(id);
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    readProduct,
    readProductById
};  