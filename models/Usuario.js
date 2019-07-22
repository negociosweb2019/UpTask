// Importar las referencias
const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyecto = require('./Proyecto');
const bcrypt = require('bcrypt-nodejs');

// Definir el modelo Usuario
const Usuario = db.define('usuario', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : Sequelize.STRING(100),
        allowNull : false,
        validate : {
            isEmail : {
                msg : 'Verifica que tu correo es un correo electrónico válido'
            }
        },
        unique : {
            args : true,
            msg : 'Ya existe un usuario registrado con ésta dirección de correo electrónico'
        }
    },
    password : {
        type : Sequelize.STRING(60),
        allowNull : false
    }
},
{
    hooks : {
        beforeCreate(usuario) {
            // Realizar el hash del password
            // https://www.npmjs.com/package/bcrypt
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})
Usuario.hasMany(Proyecto);

module.exports = Usuario;