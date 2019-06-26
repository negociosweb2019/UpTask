// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');

// Definición del modelo (Model)
const Proyecto = db.define('proyecto', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre : {
        type: Sequelize.STRING
    },

    url : Sequelize.STRING
});

// Importar el modelo para poder utilizarlo
module.exports = Proyecto;