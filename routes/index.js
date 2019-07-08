// Express router
const express = require('express');
const router = express.Router();

// Importar express-validator
// https://express-validator.github.io/docs/sanitization.html
const { body } = require('express-validator/check');

// Importar el Controller
const proyectosController = require
('../controllers/proyectosController');

module.exports = function() {

    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo_proyecto', proyectosController.formularioProyecto);
    // Implementar la validación con express-validator
    router.post('/nuevo_proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    // Mostrar un proyecto existente mediante su URL
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    // Actualizar un proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    router.post('/nuevo_proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    return router;
}