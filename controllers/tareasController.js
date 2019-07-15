// Importar los modelos
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

exports.agregarTarea = async (req, res, next) => {
    // Obtenemos el proyecto actual mediante la URL
    const proyecto = await Proyecto.findOne({
        where : {
            url : req.params.url
        }
    });

    // Leer el valor del input de la tarea mediante destructuring
    const {tarea} = req.body;

    // Mapear los valores del modelo para almacenarlos
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertando en la base de datos y redireccionando
    const resultado = await Tarea.create({
        tarea,
        estado,
        proyectoId
    });

    // Si se produce algún error
    if (!resultado) {
        return next();
    }

    // Redireccionando
    res.redirect(`/proyectos/${req.params.url}`);

    res.send('Enviado');
}

exports.actualizarEstadoTarea = async (req, res, next) => {
    // Obtener el id de la tarea
    // Patch solamente obtiene valores a través de req.params y no de req.query
    const {id} = req.params;

    // Buscar la tarea con el obtenido
    const tarea = await Tarea.findOne({
        where : {
            id : id
        }
    });

    // Cambiar el estado
    let estado = tarea.estado == 0 ? 1 : 0;

    tarea.estado = estado;

    // Actualizar la tarea
    const resultado = await tarea.save();

    if (!resultado){
        next();
    }

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
    // Obtener el id de la tarea mediante query o params
    const { id } = req.params;

    // Eliminar la tarea
    const resultado = await Tarea.destroy({
        where : {
            id : id
        }
    });

    if(!resultado) {
        return next();
    }

    res.send(200).send('La tarea ha sido eliminada correctamente');
}