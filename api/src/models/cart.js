// models/cart.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        cant_producto: {
            type: Number,
            required: true,
            min: 1
        },
        precio_total: {
            type: Number,
            default: 0
        }
    }],
    
    precio_total_prods: {
        type: Number,
        default: 0
    },
    
    cantidad_total_prods: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

cartSchema.methods.calcularTotales = function() {
    let precioTotal = 0;
    let cantidadTotal = 0;
    
    // Recorre los items y suma
    this.items.forEach(item => {
        precioTotal += item.precio_total;
        cantidadTotal += item.cant_producto;
    });
    
    this.precio_total_prods = precioTotal;
    this.cantidad_total_prods = cantidadTotal;
};

// Meotdo que nos permite vaciar el carrito, quita todos los productos del array item y reseta a 0 precio_total y cantidad_total_prods
cartSchema.methods.vaciar = function() {
    this.items = [];
    this.precio_total_prods = 0;
    this.cantidad_total_prods = 0;
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;