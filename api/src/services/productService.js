const Product = require('../models/product');
const Discount = require('../models/discount');

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

// Funciones para discount
const addDiscountToProd = async(id, discountId) =>{
    // Verificamos que existe el producto
    const product = await Product.findById(id);
    if(!product) throw new Error('No se ha encontrado el producto en la BD');

    // Verificamos que el descuento existe
    const discount = await Discount.findById(discountId)
    if(!discount) throw new Error('No se ha encontrado el descuento en la BD');
    
    // Verificamos que cuando se añada el descuento, que no se añada si ya existe previamente (asi evitamos erores de duplicación)
    if(!product.descuentos.includes(discountId)){
        product.descuentos.push(discountId);
    }

    return await product.save();
};

const removeDiscountFromProd = async(id, discountId) =>{
    const product = await Product.findById(id);
    if(!product) throw new Error('No se ha encontrado el producto en la BD');
    product.descuentos.pull(discountId);
    return await product.save();
};

const getDiscounts = async(id) =>{
    /*
    Populate es un operador de agrgación que ofrece Mongoose que te permite hacer referencia a documentos de otras colecciones,
    para entenderlo mejor, es como un join en SQL
    */
    const product = await Product.findById(id).populate('descuentos');
    if(!product) throw new Error('No se ha encontrado el producto en la BD');
    return product.descuentos;
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    readProduct,
    readProductById,
    addDiscountToProd,
    removeDiscountFromProd,
    getDiscounts
};  