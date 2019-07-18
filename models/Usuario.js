// Importar las referencias
const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyecto = require('./Proyecto');

// Definir el modelo Usuario
const Usuario = db.define('usuario', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    password : {
        type : Sequelize.STRING(60),
        allowNull : false
    }
})
Usuario.hasMany(Proyecto);

module.exports = Usuario;