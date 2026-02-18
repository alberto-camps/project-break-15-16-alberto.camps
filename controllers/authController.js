/**
 * BONUS
 * authController.js
 * Controlador de autenticación: login, registro y gestión de usuarios
 */

const template = require('../helpers/template');

const authController = {
    showLoginForm: (req, res) => {
        const html = template(`
            <h1>Login Admin</h1>
            <form action="/login" method="POST">
              <input type="text" name="user" placeholder="Usuario" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit">Entrar</button>
            </form>
            `, req);
        res.send(html);
    },
    
    login: (req, res) => {
        const { user, password } = req.body;
    
        if(
            user === process.env.ADMIN_USER &&
            password === process.env.ADMIN_PASSWORD
        ){
            req.session.isAdmin = true;
            return res.redirect('/dashboard');
    }
    
         res.send('Usuario o Contraseña Incorrecto');
    
    
    },
    
    logout: (req, res) => {
        req.session.destroy((error) =>{
            if (error) {
                return res.send('Error de cierre de sesión');
            }
            res.redirect('./login');
        });
    }
};

module.exports = authController;