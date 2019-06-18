// Importar los módulos de express
const express = require('express');
// Importar las rutas disponibles
const routes = require('./routes');
// Importar los módulos para direcciones (path)
const path = require('path');

// Crear una App de express
const app = express();

// Desde dónde se cargan los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug como nuestro Template Engine
app.set('view engine', 'pug');

// Añadir la carpeta (ruta) que contiene las View (vistas)
app.set('views', path.join(__dirname, './views'));

app.use('/', routes());

// Inicializar el servidor de express en un puerto
app.listen(7000);