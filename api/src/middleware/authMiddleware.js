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
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    }catch(err){
        return res.status(403).json({
            status: 'error',
            message: 'Token inválido o expirado'
        });
    }
}

module.exports = {
    verifyToken
};