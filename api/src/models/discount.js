const mongoose = require('mongoose');

const { Schema } = mongoose;

const discountSchema = new Schema({
    dto: {
        type: Number,
        required: true
    },
    inicio_descuento: {
        type: Date,
        required: true
    },
    fin_descuento: {
        type: Date,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;