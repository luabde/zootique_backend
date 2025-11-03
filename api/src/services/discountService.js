const Discount = require('../models/discount');

const addDiscount = async(discountData) =>{
    const newDiscount = new Discount(discountData);
    return await newDiscount.save();
};

const updateDiscount = async(discountId, discountData) =>{
    return await Discount.findByIdAndUpdate(discountId, discountData, {
        new: true,
        runValidators: true // Para que se valide lo del schema
    });
};

const deleteDiscount = async(discountId) =>{
    return await Discount.findOneAndDelete(discountId);
};

const getDiscounts = async() =>{
    return await Discount.find();
};

module.exports = {
    addDiscount,
    updateDiscount,
    deleteDiscount,
    getDiscounts
};