// Express router
const express = require('express');
const router = express.Router();

// Importar el Controller
const proyectosController = require
('../controllers/proyectosController');

module.exports = function() {
    // Ruta para el home
    router.get('/', (req, res) => {
        res.send('Index');
    });

    router.get('/', proyectosController.proyectosHome);

    return router;
}