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

    // Crear el usuario
    await Usuario.create({
        email,
        password
    })
    .then(() => {
        res.redirect('/iniciar_sesion');
    })
}