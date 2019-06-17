// Importar los módulos de express
const express = require('express');
// Importar las rutas disponibles
const routes = require('./routes');

// Crear una App de express
const app = express();

app.use('/', routes());

// Inicializar el servidor de express en un puerto
app.listen(7000);