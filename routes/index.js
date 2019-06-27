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
        proyectosController.nuevoProyecto);

    return router;
}