const user = require('../models/user');
const userService = require('../services/userService');

// Controllers de autenticación
const register = async(req, res)=>{
    try{
        const registro = await userService.registerUser(req.body);
        res.status(200).json({status: 'successful', message: "Usuario registrado correctamente", data: registro});
    }catch(err){
        res.status(400).json({status: 'error', message: err.message});
    }
    
};

const login = async(req, res)=>{
    try{
        const { email, contraseña } = req.body;
    
        if(!email || !contraseña){
            throw new Error('El email y la contraseña, son obligatorios');
        }
    
        const resultado = await userService.loginUser(email, contraseña);

        res.status(200).json({status: 'successful', message: 'Usuario correctamente logeado', data: resultado});
    }catch(err){
        res.status(400).json({status: 'error', message: err.message});
    }
};
// Controllers de usuario
const createUser = async(req, res)=>{
    try{
        const user = await userService.createUser(req.body);
        return res.status(200).json({status: 'success', data: user});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const deleteUser = async (req, res) =>{
    try{
        const { id } = req.params;
        const deleted = await userService.deleteUser(id);

        if(!deleted){
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }
        return res.status(200).json({status: 'success', data: "Usuario eliminado corerctamente"});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};


const updateUser = async (req, res) =>{
    try{
        const { id } = req.params;
        const updated = await userService.updateUser(id, req.body);
    
        if(!updated){
            return res.status(404).json({status: 'error', message: 'Usuario no encontrado'});
        }
    
        return res.status(200).json({status: 'success', data: updated});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const getAllUsers = async (req, res) =>{
    try{
        const users = await userService.getUsers();
        return res.status(200).json({status: 'success', data: users});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
}

const getUserById = async(req, res) =>{
    try{
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if(!user){
            return res.status(404).json({status: 'error', message: 'Usuario no encontrado'});
        }

        return res.status(200).json({status: 'success', message: user});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

// Controllers de direcciones
const addDirection = async(req, res) =>{
    try{
        const { id } = req.params;
        const direccion = await userService.addDirection(id, req.body);

        if(!direccion){
            return res.status(404).json({status: 'error', message: "No se ha encontrado el user"});
        }
        
        return res.status(200).json({status: 'success', data: direccion});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

const updateDirection = async (req, res) => {
    try {
        const { id, direccionId } = req.params;
        const user = await userService.updateDirection(id, direccionId, req.body);
        
        return res.status(200).json({ 
            status: 'success',
            data: user.direcciones 
        });
    } catch (error) {
        return res.status(400).json({ 
            status: 'error', 
            message: error.message 
        });
    }
};

const deleteDirection = async (req, res) => {
    try {
        const { id, direccionId } = req.params;
        await userService.deleteDirection(id, direccionId);
        
        return res.status(200).json({ 
            status: 'success', 
            message: 'Dirección eliminada correctamente' 
        });
    } catch (error) {
        return res.status(400).json({ 
            status: 'error', 
            message: error.message 
        });
    }
};

// Controllers de metodosPago
const addMetodoPago = async (req, res) => {
    try {
        const { id, metodoId } = req.params;
        const user = await userService.addMetodoPago(id, metodoId, req.body);
        
        return res.status(201).json({status: 'success', data: user.metodos_pago 
        });
    } catch (error) {
        return res.status(400).json({status: 'error', message: error.message 
        });
    }
};

const updateMetodoPago = async (req, res) => {
    try {
        const { id, metodoId } = req.params;
        const user = await userService.updateMetodoPago(id, metodoId, req.body);
        
        return res.status(200).json({ 
            status: 'success', data: user.metodos_pago 
        });
    } catch (error) {
        return res.status(400).json({status: 'error', message: error.message 
        });
    }
};

const getMetodosPago = async (req, res) => {
    try {
        const { id } = req.params;
        const metodos = await userService.getMetodoPago(id);
        
        return res.status(200).json({ 
            status: 'success', data: metodos 
        });
    } catch (error) {
        return res.status(400).json({status: 'error', message: error.message 
        });
    }
};

// Controllers de puntos
const addPuntos = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        
        if (!cantidad || cantidad <= 0) {
            return res.status(400).json({status: 'error', message: 'La cantidad debe ser mayor a 0' 
            });
        }
        
        const user = await userService.addPuntos(id, cantidad);
        
        return res.status(200).json({status: 'success', data: user.puntos});
    } catch (error) {
        return res.status(400).json({status: 'error', message: error.message});
    }
};


const removePuntos = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        
        if (!cantidad || cantidad <= 0) {
            return res.status(400).json({status: 'error', message: 'La cantidad debe ser mayor a 0' 
            });
        }
        
        const user = await userService.removePuntos(id, cantidad);
        
        return res.status(200).json({status: 'success', data: user.puntos});
    } catch (error) {
        return res.status(400).json({status: 'error', message: error.message});
    }
};

const getPuntos = async (req, res) =>{
    try{
        const { id } = req.params;
        const puntos = await userService.getPuntos(id, req.body);
    
        return res.status(200).json({status: 'success', data: puntos});
    }catch(err){
        return res.status(400).json({status: 'error', message: err.message});
    }
};

// Controller de favoritos
const addFavorito = async (req, res) => {
    try {
        const { id, productoId } = req.params;
        
        const user = await userService.addFavorito(id, productoId);
        
        res.status(200).json({status: 'success', message: 'Producto añadido a favoritos', data: user.favoritos});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message
        });
    }
};

const removeFavorito = async (req, res) => {
    try {
        const { id, productoId } = req.params;
        const user = await userService.removeFavorito(id, productoId);
        
        res.status(200).json({status: 'success', message: 'Producto eliminado de favoritos', data: user.favoritos});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message});
    }
};

const getFavoritos = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritos = await userService.getFavoritos(id);
        
        res.status(200).json({status: 'success', data: favoritos});
    } catch (error) {
        res.status(400).json({status: 'error', message: error.message
        });
    }
};

module.exports = {
    register,
    login,
    createUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById,
    addDirection,
    updateDirection,
    deleteDirection,
    addMetodoPago,
    updateMetodoPago,
    getMetodosPago,
    addPuntos,
    removePuntos,
    getPuntos,
    addFavorito,
    removeFavorito,
    getFavoritos
};