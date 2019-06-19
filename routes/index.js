// Express router
const express = require('express');
const router = express.Router();

// Importar el Controller
const proyectosController = require
('../controllers/proyectosController');

module.exports = function() {

    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo_proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo_proyecto', proyectosController.nuevoProyecto);

    return router;
}