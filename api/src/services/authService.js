const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generar tokens

const generateAccessToken = (playload) =>{
    /*
        Esta función nos permite generar los access tokens. Estos unicamente duraran 15 minutos y se usa para acceder a rutas protegidas. 
        A la función se le pasa el playload que contiene info util del usuario.
    */
    return jwt.sign(playload, process.env.JWT_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (playload) =>{
    /*
        Esta función nos permite generar los refreshTokens, estos tienen una duración más larga, porque no son los que te permiten a acceder rutas protegidas, sino que nos permite obtener un nuevo access token cuando este se expira.
    */

    return jwt.sign(playload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

// Funciones de autenticación
const registerUser = async(userData) =>{
    // Verificar si el user ya existe
    const userExiste = await User.findOne({email: userData.email});
    if(userExiste){
        throw new Error ('El usuario ya existe');
    }

    // Crear el user (la contraseña se hashea automáticamente)
    const nuevoUsuario = new User(userData);
    
    // Generamos el playload que se usara para crear el access y refreshtoken que es la info necesaria del usuario.
    const playload = { 
        userId: nuevoUsuario._id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol 
    };

    const accessToken = generateAccessToken(playload);
    const refreshToken = generateRefreshToken(playload);
    
    nuevoUsuario.refreshToken = refreshToken;
    await nuevoUsuario.save();

    // Retornar usuario sin contraseña y el token
    return {
        usuario: {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            apellidos: nuevoUsuario.apellidos,
            email: nuevoUsuario.email,
            username: nuevoUsuario.username,
            rol: nuevoUsuario.rol
        },
        accessToken,
        refreshToken
    };
}

const loginUser = async(email, contraseña) =>{
    const usuario = await User.findOne({ email });

    if(!usuario){
        throw new Error ('Credenciales incorrectas');
    }

    if(usuario.bann){
        throw new Error('El usuario esta baneado, porfavor contacte con un administrador');
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if(!contraseñaValida){
        throw new Error('Credenciales incorrectas');
    }

    // Generamos el playload que se usara para crear el access y refreshtoken que es la info necesaria del usuario.
    const playload = { 
        userId: usuario._id,
        email: usuario.email,
        rol: usuario.rol 
    };

    const accessToken = generateAccessToken(playload);
    const refreshToken = generateRefreshToken(playload);
    
    usuario.refreshToken = refreshToken;
    await usuario.save();

    // Retornar usuario sin contraseña y el token
    return {
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email,
            username: usuario.username,
            rol: usuario.rol
        },
        accessToken,
        refreshToken
    };
}

const refreshUserToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== token) {
            throw new Error('Token inválido o expirado');
        }

        const payload = {
            userId: decoded.userId,
            email: decoded.email,
            rol: decoded.rol
        };

        const nuevoAccessToken = generateAccessToken(payload);
        return nuevoAccessToken;
    } catch (err) {
        throw new Error('Token inválido o expirado');
    }
};

const logoutUser = async (token) => {
    if (!token) return;

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);
        if (user && user.refreshToken === token) {
            user.refreshToken = null;
            await user.save();
        }
    } catch (err) {
        // Ignorar de forma segura si el token es invalido en el DB al cerrar sesion
        console.error("Error al cerrar sesión:", err.message);
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshUserToken,
    logoutUser
};
