// Importar el modelo
const Usuario = require('../models/Usuario');

exports.formularioCrearCuenta = (req, res, next) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear una cuenta en UpTask'
    });
}

exports.crearCuenta = async (req, res, next) => {
    // Obtener los datos
    // Cuando enviamos a través de POST utilizamos req.body
    // Capturar los valores con destructuring
    const { email, password } = req.body;

    // Intentar crear el usuario y capturar el error en caso de haberlo
    try {
        // Crear el usuario
        await Usuario.create({
            email,
            password
        })
        .then(() => {
            res.redirect('/iniciar_sesion');
        })
    } catch (error) {
        // Utilizando connect-flash
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            nombrePagina : 'Crear una cuenta en UpTask',
            mensajes : req.flash(),
            email,
            password
        });
    }
}