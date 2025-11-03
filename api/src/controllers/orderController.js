const orderService = require('../services/orderService');

const addOrder = async (req, res) =>{
    try{
        const { userId } = req.params;
    
         const { product_data: productData, direction_id: directionId, metodo_pago_id: metodoPagoId, estado, fecha_fin: fechaFin } = req.body;

        // Validaciones
        if (!productData || !Array.isArray(productData) || productData.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Se requiere al menos un producto para crear el pedido' });
        }
        if (!directionId) {
            return res.status(400).json({ status: 'error', message: 'Se requiere una dirección de envío' });
        }
        if (!metodoPagoId) {
            return res.status(400).json({ status: 'error', message: 'Se requiere un método de pago' });
        }

        const order = await orderService.addOrder(userId, productData, directionId, metodoPagoId, estado, fechaFin);
        return res.status(200).json({status: 'success', data: order});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
}

const getAllOrders = async (req, res) =>{
    try{
        const { userId } = req.params;
        const order = await orderService.getAllOrders(userId);
        return res.status(200).json({status: 'success', data: order});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const getOrder = async (req, res) =>{
    try{
        const { userId, orderId } = req.params;
        const order = await orderService.getOrder(userId, orderId);
        return res.status(200).json({status: 'success', data: order});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const updateEstado = async (req, res) =>{
    try{
        const { orderId } = req.params;
        const estado = req.body.estado;
    
        const order = await orderService.updateEstado(orderId, estado);
        return res.status(200).json({status: 'success', data: order});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

module.exports = {
    addOrder,
    getAllOrders,
    getOrder,
    updateEstado
}