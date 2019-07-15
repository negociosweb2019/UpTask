// Express router
const express = require('express');
const router = express.Router();

// Importar express-validator
// https://express-validator.github.io/docs/sanitization.html
const { body } = require('express-validator/check');

// Importar los Controllers
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

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

    // Eliminar el proyecto
    router.delete('/proyecto/:url', proyectosController.eliminarProyecto);
    
    // Agregar tarea
    router.post('/proyectos/:url', tareasController.agregarTarea);

    // Actualizar el estado de una tarea
    router.patch('/tarea/:id', tareasController.actualizarEstadoTarea);

    // Eliminar una tarea
    router.delete('/tarea/:id', tareasController.eliminarTarea);
    
    return router;
}