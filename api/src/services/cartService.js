const Cart = require('../models/cart');
const Product = require('../models/product');

const getCart = async (userId) => {
    let cart = await Cart.findOne({ user_id: userId })
        .populate('items.product_id');

    // Si no existe el carrito, se crea, porque al final el usuario siempre debe tener su carrito
    if (!cart) {
        cart = new Cart({ user_id: userId, items: [] });
        await cart.save();
    }

    return cart;
};

const addItemCart = async (userId, productId, cantidad = 1) => {
    // Validar producto y stock
    const producto = await Product.findById(productId);
    if (!producto) throw new Error('Producto no encontrado');
    if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente. Solo hay ${producto.stock} unidades`);
    }

    let cart = await Cart.findOne({ user_id: userId });

    // Si el carrito no existe, se crea
    if (!cart) {
        cart = new Cart({ user_id: userId, items: [] });
    }

    // Añadimos el item directamente con el precio base del producto
    cart.items.push({
        product_id: productId,
        cant_producto: cantidad,
        precio_total: producto.precio * cantidad
    });

    // Se llama al metodo de cart que se encarga de calcular el precio total de todo el carrito y de la cantidad total de prods añadidos
    cart.calcularTotales();

    // Guardamos el cart
    return await cart.save();
};

const removeItemCart = async (userId, itemId) => {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) throw new Error('Carrito no encontrado');

    cart.items.pull(itemId);
    // Se recalculan los totales después de haver elimnado el producto
    cart.calcularTotales();
    // Se guarda el carrito
    return await cart.save();
};

const vaciarCart = async (userId) => {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) throw new Error('Carrito no encontrado');

    cart.vaciar();
    return await cart.save();
};

const updateItemCart = async (userId, itemId, cantidad) => {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) throw new Error('Carrito no encontrado');

    // Buscamos el item dentro del array de items del carrito
    const item = cart.items.id(itemId);
    if (!item) throw new Error('Producto no encontrado en el carrito');

    // Validar stock del producto original
    const producto = await Product.findById(item.product_id);
    if (!producto) throw new Error('El producto ya no existe en la base de datos');

    if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente. Solo hay ${producto.stock} unidades`);
    }

    // Actualizamos la cantidad y el precio total de ese item usando el precio base
    item.cant_producto = cantidad;
    item.precio_total = producto.precio * cantidad;

    // Recalculamos los totales del carrito completo
    cart.calcularTotales();

    // Guardamos los cambios
    return await cart.save();
};

module.exports = {
    getCart,
    addItemCart,
    removeItemCart,
    vaciarCart,
    updateItemCart
};