const authService = require('../services/authService');
const User = require('../models/user');

// Constante para las cookies
/* Parametros que se usan
    - httpOnly --> Impide que el navegador de js acceda a la cookie
    - secure --> Condicional de que si estamos en produccion que se envie solo si la conexion es HTTPS, pero de momento no esta configuradom porque estamos en entorno pruevas desde el localhost
    - sameSite --> Bloquea que la cookie se envia a peticiones de otros dominios
    - maxAge --> Duración máxima de la cookie
*/
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7
}
// Controllers de autenticación
const register = async(req, res)=>{
    try{
        const registro = await authService.registerUser(req.body);
        
        // res.status(200).json({status: 'successful', message: "Usuario registrado correctamente", data: registro});
        // Despues de llamar al service, devolveremos a las cookies el accessToken y el refreshToken.
        res
        .cookie('accessToken', registro.accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 1000* 60 * 15
        })
        .cookie('refreshToken', registro.refreshToken, COOKIE_OPTIONS)
        .json({
            status: 'success',
            message: 'Usuario registrado correctamente',
            // Por seguridad, no se devuelve el token unicamente la info del usuario
            data: {usuario: registro.usuario}
        });
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
    
        const resultado = await authService.loginUser(email, contraseña);
        // Guardamos los tokens en las cookies y devolvemos un json
        res
        .cookie('accessToken', resultado.accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 1000 * 60 * 15
        })
        .cookie('refreshToken', resultado.refreshToken, COOKIE_OPTIONS)
        .json({ status: 'success', message: 'User logueado correctamente', data: resultado.usuario});
    }catch(err){
        res.status(400).json({status: 'error', message: err.message});
    }
};

const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'No hay refresh token' });
    }

    try {
        const nuevoAccessToken = await authService.refreshUserToken(token);

        return res
            .cookie('accessToken', nuevoAccessToken, {
                ...COOKIE_OPTIONS,
                maxAge: 1000 * 60 * 15
            })
            .json({ status: 'success', message: 'Token renovado correctamente' });

    } catch (err) {
        return res.status(403).json({ status: 'error', message: 'Refresh token inválido o expirado' });
    }
};

const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    
    if (token) {
        await authService.logoutUser(token);
    }

    return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ status: 'success', message: 'Sesión cerrada correctamente' });
};

/**
 * Usuario actual según el accessToken (cookie o Authorization).
 * Se devuelve también el `rol` para que el frontend pueda:
 * - redirigir cuenta -> dashboard correcto (cliente/admin)
 * - aplicar protección visual por rol en rutas/pantallas.
 */
const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('nombre rol');
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
        }
        return res.status(200).json({
            status: 'success',
            data: {
                id: user._id.toString(),
                nombre: user.nombre,
                rol: user.rol
            }
        });
    } catch (err) {
        return res.status(400).json({ status: 'error', message: err.message });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    me
};
