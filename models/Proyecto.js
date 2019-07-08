// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

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
}, {
    hooks : {
        beforeCreate(proyecto) {
            console.log('Antes de insertar en la base de datos');
            const url = slug(proyecto.nombre).toLowerCase();

            proyecto.url = `${url}-${shortid.generate()}`;
        },

        beforeUpdate(proyecto) {
            console.log('Antes de actualizar en la base de datos');
            const url = slug(proyecto.nombre).toLowerCase();

            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

// Importar el modelo para poder utilizarlo
module.exports = Proyecto;