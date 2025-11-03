const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        // SnapShot del producto
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true,
            min: 0
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        },
        precio_total: {
            type: Number,
            required: true
        },
        tipo: String,
        descuentos_aplicados: [{
            nombre: String,
            tipo: String,
            valor: Number
        }]
    }],

    // direccion a la que se envía de todas las que tiene el user
    direccion_envio_id: {
        type: Schema.Types.ObjectId,
        ref: 'User.direcciones',
        required: true
    },
    metodo_pago_id: {
        type: Schema.Types.ObjectId,
        ref: 'User.metodos_pago',
        required: true
    },
    estado: {
        type: String,
        enum: ['preparación', 'recogida', 'reparto', 'entregado'],
        default: 'preparación'
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    fecha_pedido: {
        type: Date,
        default: Date.now
    },
    fecha_entrega: Date
});

// Se hace un metodo para calcular el precio_total y el subtotal
orderSchema.methods.calcularTotales = function(){
    let subtotal = 0;
    // Recorremos todos los items, por cada uno se calcula el precio_total en base a la cantidad y al descuento.
    // Dsepués se va sumando a subtotal
    this.items.forEach(item =>{
        const precioSinDto = item.precio * item.cantidad;
        let totalDescuento = 0;
        item.descuentos_aplicados.forEach(dto => {
            totalDescuento += precioSinDto * (dto.valor / 100);
        });

        item.precio_total = precioSinDto - totalDescuento;
        subtotal += item.precio_total;
    });

    this.subtotal = subtotal;
};
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;