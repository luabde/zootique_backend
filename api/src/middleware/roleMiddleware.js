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
// /api/users/:id usa `id`; /api/cart/:userId y /api/orders/:userId usan `userId`.
const isOwnerOrAdmin = (req, res, next) => {
    const id = req.params.id ?? req.params.userId;

    const esAdmin = req.user.rol === 'admin';
    const esDueño = String(req.user.userId) === String(id);

    if (!esAdmin && !esDueño) {
        return res.status(403).json({
            status: 'error',
            message: 'No tienes permisos para acceder a este recurso'
        });
    }
    next();
};

module.exports = { verifyAdmin, isOwnerOrAdmin };