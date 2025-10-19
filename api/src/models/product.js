const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: {
        type: String,
        unique: true, 
        required: [true, 'Se require el nombre']
    },
    descripcion: {
        type: String,
        maxlength: 300,
        required: false 
    },
    precio: {
        type: Number,
        required: [true, 'Se requiere un precio'],
        min: [0, 'El precio tiene que ser mayor que 0']
    },
    tipo: {
        type: String,
        enum: ['Alimento', 'Accesorio', 'Higiene y cuidado', 'Salud', 'Juguete', 'Hábitat', 'Servicios'],
        required: [true, 'Se require especificar el tipo de producto (categoria)']
    },
    stock: {
        type: Number,
        required: [true, 'Se necesita especificar el stock del producto']
    }
});

productSchema.index({ tipo: 1 });

const product = mongoose.model('product', productSchema);

module.exports = product;