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
    const producto = await Product.findById(productId).populate('descuentos');
    if (!producto) throw new Error('Producto no encontrado');
    if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente. Solo hay ${producto.stock} unidades`);
    }
    
    let cart = await Cart.findOne({ user_id: userId });
    
    // Si el carrito no existe, se crea
    if (!cart) {
        cart = new Cart({ user_id: userId, items: [] });
    }
    
    
    // Calcular precio aplicando descuentos, en caso de que tenga
    let precio = producto.precio;
    if (producto.descuentos && producto.descuentos.length > 0) {
        producto.descuentos.forEach(dto => {
            if (dto.activo) {
                precio -= precio * (dto.dto / 100);
            }
        });
    }
    
    cart.items.push({
        product_id: productId,
        cant_producto: cantidad,
        precio_total: precio * cantidad
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

module.exports = {
    getCart,
    addItemCart,
    removeItemCart,
    vaciarCart
};