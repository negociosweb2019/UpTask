// Importar passport
// http://www.passportjs.org/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al Modelo desde el cual se realiza la autenticación
const Usuario = require('../models/Usuario');

// Definir nuestra estrategia de autenticación
// Local Strategy --> Login con credenciales propias (user, passwd)
passport.use(
    new LocalStrategy(
        // Por defecto passport espera un usuario y una contraseña
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async (email, password, done) => {
            try {
                // Realizar una búsqueda del usuario
                const usuario = await Usuario.findOne({
                    where : { email : email }
                });
                // El usuario existe, verificar si la contraseña es correcta
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message : 'La contraseña es incorrecta'
                    });
                }
                // El usuario y la contraseña son correctas
                return done(null, usuario);x
            } catch (error) {
                // El usuario no existe
                return done(null, false, {
                    message : 'La cuenta de correo electrónico no se encuentra registrada.'
                });
            }
        }
    )
);

// Permite a passport leer los valores del objeto
// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Exportar
module.exports = passport;