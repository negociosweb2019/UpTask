// Importar passport
const passport = require('passport');
// Importar el modelo de Usuario
const Usuario = require('../models/Usuario');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/iniciar_sesion',
    failureFlash : true,
    badRequestMessage : 'Debes ingresar tu correo electrónico y tu contraseña'
});

exports.cerrarSesion = (req, res) => {
    // Al cerrar sesión el usuario debería ser redirigido al inico de sesión
    req.session.destroy(() => {
        res.redirect('/');
    })
}

// Verificar si el usuario se encuentra autenticado o no
exports.usuarioAutenticado = (req, res, next) => {
    // Si el usuario está autenticado que continúe...
    if(req.isAuthenticated()) {
        return next();
    }

    // Si el usuario no está autenticado que inicie sesión
    return res.redirect('/iniciar_sesion');
}

// Generar un token si el usuario es válido
exports.enviarToken = async (req, res) => {
    // Verificar si el usuario existe
    const { email } = req.body;
    const usuario = await Usuario.findOne({
        where : {
            email : email
        }
    });
}