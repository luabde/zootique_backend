const User = require('../models/user');
const Product = require('../models/product');

// Funciones especificas para user
const createUser = async (userData) =>{
    const newUser = new User(userData);
    return await newUser.save();
};

const deleteUser = async(id) =>{
    return await User.findByIdAndDelete(id);
};

const updateUser = async (id, updateData) =>{
    return await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
};

const getUsers = async() =>{
    return await User.find();
};

const getUserById = async(id) =>{
    return await User.findById(id);
};

// Funciones especificas para las direcciones
const addDirection = async(idUser, directionData) =>{
    const user = await User.findById(idUser);
    user.direcciones.push(directionData);
    return await user.save();
};

const updateDirection = async(idUser, idDirection, updateData) =>{
    const user = await User.findById(idUser);

    if(!user) throw new Error('Usuario no encontrado');
    
    const direction = user.direcciones.id(idDirection);

    if (!direction) throw new Error('Dirección no encontrada');

    // en direcciones se guaradran los cambios, si hay algo que ya estaba lo deja asi
    Object.assign(direction, updateData);
    return user.save();
};

const deleteDirection = async(idUser, idDirection)=>{
    const user = await User.findById(idUser);
    user.direcciones.pull(idDirection);
    return await user.save();
};

// Funciones para metodos de pago
const addMetodoPago = async (userId, metodoData) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    // Se hace un push, se usa ..metodoData (recupera lo que hay en metodoData) para poder añadir la fecha de creación actualizada
    user.metodos_pago.push({
        ...metodoData, 
        fecha_creacion: new Date()
    });
    return await user.save();
};

const updateMetodoPago = async (userId, metodoId, metodoData) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    const metodo = user.metodos_pago.id(metodoId);
    
    // Recordad que el object.assign no funciona con array por eso antes se guarda en metodo para luego poder hacer referencia al objeto en vede al array de metodosPago
    Object.assign(metodo, metodoData);
    return await user.save();
};

const getMetodoPago = async (userId) => {
    const user = await User.findById(userId).select('metodos_pago');
    if (!user) throw new Error('Usuario no encontrado');

    return user.metodos_pago;
};

// Funciones para puntos
const addPuntos = async (userId, cantidad) =>{
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    user.puntos.puntos_acumulados += cantidad;
    user.puntos.actualizacion_puntos = new Date();
    console.log(user);
    return await user.save();
};

const removePuntos = async(userId, cantidad) =>{
    const user = await User.findById(userId);
    user.puntos.puntos_acumulados -= cantidad;
    user.puntos.actualizacion_puntos = new Date();

    return await user.save();
};

const getPuntos = async (userId) => {
    const user = await User.findById(userId).select('puntos');
    if (!user) throw new Error('Usuario no encontrado');

    return user.puntos;
};

// Funciones para favoritos
const addFavorito = async (userId, productoId) =>{
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    
    // Validar que el producto existe
    const product = await Product.findById(productoId);
    if (!product) throw new Error('Producto no encontrado');
    
    // Validar límite
    if (user.favoritos.length >= 200) {
        throw new Error('Has alcanzado el límite de 200 favoritos. Elimina algunos para añadir nuevos.');
    }
    
    // Validar que no esté ya en favoritos
    if (user.favoritos.includes(productoId)) {
        throw new Error('Este producto ya está en tus favoritos');
    }
    
    user.favoritos.push(productoId);
    return await user.save();
}

const removeFavorito = async (userId, productoId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    
    user.favoritos.pull(productoId);
    return await user.save();
};

const getFavoritos = async (userId) => {
    const user = await User.findById(userId).populate('favoritos');
    
    if (!user) throw new Error('Usuario no encontrado');
    return user.favoritos;
};


module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    getUserById,
    addDirection,
    updateDirection,
    deleteDirection,
    addMetodoPago,
    updateMetodoPago,
    getMetodoPago,
    addPuntos,
    removePuntos,
    getPuntos,
    addFavorito,
    removeFavorito,
    getFavoritos
};