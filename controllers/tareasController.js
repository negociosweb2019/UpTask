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