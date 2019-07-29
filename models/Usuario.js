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
            },
            notEmpty : {
                msg : 'El correo electrónico no puede ser vacío'
            }
        },
        unique : {
            args : true,
            msg : 'Ya existe un usuario registrado con ésta dirección de correo electrónico'
        }
    },
    password : {
        type : Sequelize.STRING(60),
        allowNull : false,
        validate : {
            notEmpty : {
                msg : 'La contraseña no puede ser vacía'
            }
        }
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
});
Usuario.hasMany(Proyecto);

// Métodos personalizados
// Verificar si el password enviado es igual al existente
Usuario.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuario;