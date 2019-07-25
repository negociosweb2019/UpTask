// Importar los módulos de express
const express = require('express');
// Importar las rutas disponibles
const routes = require('./routes');
// Importar los módulos para direcciones (path)
const path = require('path');
// Importar los módulos para utilizar body parser
const bodyParser = require('body-parser');
// Importar los helpers con funciones en común para el proyecto
const helpers = require('./helpers');
// Importar connect-flags disponible para todo el sitio
const flash = require('connect-flash');
// Importar express-session para poder manejar sesiones de usuario
const session = require('express-session');
// Importar cookie-parser para permitir el uso de cookies en el sitio
const cookieParser = require('cookie-parser');
// Importar passport para permitir el inicio de sesión en el sitio
const passport = require('./config/passport');

// Crear la conexión con la Base de Datos
const db = require('./config/db');

// Importar los modelos
require('./models/Proyecto');
require('./models/Tarea');
require('./models/Usuario');

// Realizar la conexión
// Sequelize se conecta mediante promises
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
db.sync()
    .then(() => console.log('Conectado al servidor de BD'))
    .catch(error => console.log(error));

// Crear una App de express
const app = express();

// Desde dónde se cargan los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug como nuestro Template Engine
app.set('view engine', 'pug');

// Habilitar BodyParser para leer los datos de los formularios
app.use(bodyParser.urlencoded({extended: true}));

// habilitar el uso de mensajes de tipo connect-flash
// https://github.com/jaredhanson/connect-flash
// https://www.npmjs.com/package/connect-flash
app.use(flash());

// Habilitar cookie-parser
// https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());

// Habilitar las sesiones
// Las sesiones le permiten al usuario navegar entre distintas
// páginas sin necesidad de volver a autenticarse
// https://www.npmjs.com/package/express-session
app.use(session({
    secret : 'unultrasecreto',
    resave : false,
    saveUninitialized : false
}));

// Crear una instancia de passport
app.use(passport.initialize());
app.use(passport.session());

// Pasar el vardump a la aplicación (middleware)
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

// Añadir la carpeta (ruta) que contiene las View (vistas)
app.set('views', path.join(__dirname, './views'));

app.use('/', routes());

// Inicializar el servidor de express en un puerto
app.listen(7000);