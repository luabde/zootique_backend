const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

const addOrder = async (userId, productData, directionId, metodoPagoId, estado, fecha_fin) =>{
    // Buscamos el user
    const user = await User.findById(userId);
    if (!user) throw new Error('No se ha encontrado el usuario');

    // Buscamos la dirección
    const direction = user.direcciones.id(directionId);
    if(!direction) throw new Error('No se ha encontrado la dirección');

    // Buscamos el método
    const metodo = user.metodos_pago.id(metodoPagoId);
    if (!metodo) throw new Error('No se ha encontrado metodo de pago');

    // Buscamos los items y los guardamos en items para el snapshot
    const items = [];
    for(const item of productData){
        const product = await Product.findById(item.id);
        if (!product) throw new Error(`Producto ${item.id} no encontrado`);
        if (product.stock < item.cantidad) throw new Error(`Stock insuficiente para ${product.nombre}`);

        items.push({
            product_id: product._id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: item.cantidad,
            tipo: product.tipo,
            descuentos_aplicados: item.descuentos_aplicados || [],
            precio_total: 0 
        });
    }

    // Se crea el nuevo pedido con los datos correctos
    const nuevoPedido = new Order({
        user_id: user._id,
        items,
        direccion_envio_id: directionId,
        metodo_pago_id: metodoPagoId,
        estado: estado,
        subtotal: 0,
        fecha_entrega: fecha_fin
    });

    // Antes de guardar, se llama al metodo para que calcule los totales
    nuevoPedido.calcularTotales();

    return await nuevoPedido.save();
};

const getAllOrders = async (userId) =>{
    return await Order.findById(userId);
};

const getOrder = async (userId, orderId) =>{
    const user = await User.findById(userId);
    if(!user) throw new Error('No se ha encontrado el usuario');

    const orders = await Order.find({ user_id: userId });
    return orders;
};

const updateEstado = async (orderId, estado) =>{
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado");

    order.estado = estado;
    return await order.save();
};

module.exports = {
    addOrder,
    getAllOrders,
    getOrder,
    updateEstado
}