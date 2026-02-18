/**
 * BONUS
 * authMiddleware.js
 * Middleware para verificar la autenticación y autorización de usuarios
 */
const authMiddleware = (req, res, next) => {
    if (req.session.isAdmin) {
        // Usuario autenticado, continuar con la siguiente función          
        next();
    } else {
        res.redirect('/login'); // Redirige al formulario de login si no está autenticado
    }
};

module.exports = authMiddleware;
