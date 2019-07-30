// Express router
const express = require('express');
const router = express.Router();

// Importar express-validator
// https://express-validator.github.io/docs/sanitization.html
const { body } = require('express-validator/check');

// Importar los Controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function() {

    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );
    router.get('/nuevo_proyecto', 
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
    );
    // Implementar la validación con express-validator
    router.post('/nuevo_proyecto', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    // Mostrar un proyecto existente mediante su URL
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl
    );

    // Actualizar un proyecto
    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado, 
        proyectosController.formularioEditar
    );
    router.post('/nuevo_proyecto/:id',
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    // Eliminar el proyecto
    router.delete('/proyecto/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );
    
    // Agregar tarea
    router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    // Actualizar el estado de una tarea
    router.patch('/tarea/:id', tareasController.actualizarEstadoTarea);

    // Eliminar una tarea
    router.delete('/tarea/:id', tareasController.eliminarTarea);

    // Crear una nueva cuenta
    router.get('/crear_cuenta', usuariosController.formularioCrearCuenta);
    router.post('/crear_cuenta', usuariosController.crearCuenta);

    // Iniciar sesión
    router.get('/iniciar_sesion', usuariosController.formularioIniciarSesion);
    router.post('/iniciar_sesion', authController.autenticarUsuario);

    // Cerrar sesión
    router.get('/cerrar_sesion', authController.cerrarSesion);

    // Reestablecer la contraseña
    router.get('/reestablecer', usuariosController.formularioReestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword);
    
    return router;
}