// Express router
const express = require('express');
const router = express.Router();

// Importar el Controller
const proyectosController = require
('../controllers/proyectosController');

module.exports = function() {

    router.get('/', proyectosController.proyectosHome);

    return router;
}