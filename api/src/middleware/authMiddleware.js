const jwt = require('jsonwebtoken');

// Validar que el token sea correcto
const verifyToken = (req, res, next) =>{
    const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).json({
            status: 'error',
            message: 'No autorizado'
        });
    }

    try{
        const verify = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = verify;
        next();
    }catch(err){
        return res.status(403).json({
            status: 'error',
            message: 'Token inválido o expirado'
        });
    }
}

// Validar si es admin. Esto nos sirve para aquellas rutas protegidas que solo se puede acceder si eres admin
const verifyAdmin = (req, res, next) =>{
    if (req.user.rol !== 'admin') {
        return res.status(403).json({
            status: 'error',
            message: 'Se requiere rol de administrador'
        });
    }
    next();
}

// Verificar que sa el dueño o admin, es decir por ejemplo si quieres cambiar la contraseña pues que no puedas cambiarla de otro usuario
const isOwnerOrAdmin = (req, res, next) =>{
    
}

module.exports = {
    verifyToken,
    verifyAdmin
};