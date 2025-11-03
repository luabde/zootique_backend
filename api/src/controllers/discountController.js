const discountService = require('../services/discountService');

const addDiscount = async (req, res) =>{
    try{
        const discount = await discountService.addDiscount(req.body);
        return res.status(200).json({status: 'success', data: discount});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const updateDiscount = async (req, res) =>{
    try{
        const { id } = req.params;
        const discount = await discountService.updateDiscount(id, req.body);
        if(!discount) throw new Error('No se ha encontrado el descuento');
        return res.status(200).json({status: 'success', data: discount});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const deleteDiscount = async (req, res) =>{
    try{
        const { id } = req.params;
        const discount = await discountService.deleteDiscount(id);
        if(!discount) throw new Error('No se ha encontrado el descuento');
        return res.status(200).json({status: 'success', data: discount});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const getDiscounts = async (req, res) =>{
    try{
        const discounts = await discountService.getDiscounts();
        return res.status(200).json({status: 'success', data: discounts});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

module.exports = {
    addDiscount,
    updateDiscount,
    deleteDiscount,
    getDiscounts
};