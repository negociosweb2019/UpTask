// Importar los modelos
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

exports.proyectosHome = async (req, res) => {
    // Obtener todos los proyectos del usuario actual
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyecto.findAll({
        where : {
            usuarioId : usuarioId
        }
    });

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });
};

exports.formularioProyecto = async (req, res) => {
    // Obtener todos los proyectos del usuario actual
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyecto.findAll({
        where : {
            usuarioId : usuarioId
        }
    });

    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo proyecto',
        proyectos
    });
};

exports.nuevoProyecto = async (req, res) => {
    // Obtener todos los proyectos del usuario actual
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyecto.findAll({
        where : {
            usuarioId : usuarioId
        }
    });

    // Validar que el input del formulario traiga un valor
    // Utilizamos asignación por destructuring
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
    const { nombre } = req.body;
    let errores = [];

    // Verificar si el nombre del proyecto tiene un valor
    if (!nombre) {
        errores.push({'texto': 'El nombre del proyecto no puede ser vacío.'});
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo proyecto',
            proyectos,
            errores
        });
    } else {
        // No existen errores
        // Inserción en la base de datos.
        const usuarioId = res.locals.usuario.id;
        console.log(res.locals.usuario);
        await Proyecto.create({ nombre, usuarioId });

        // Redirigir hacia la ruta principal
        res.redirect('/');
    }
};

exports.proyectoPorUrl = async (req, res, next) => {
    // Obtener todos los proyectos del usuario actual
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = await Proyecto.findAll({
        where : {
            usuarioId : usuarioId
        }
    });

    // Obtener el proyecto a editar
    const proyectoPromise = Proyecto.findOne({
        where : {
            url : req.params.url
        }
    });

    // Promise con destructuring
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Obtener las tareas del proyecto actual
    const tareas = await Tarea.findAll({
        where : {
            proyectoId: proyecto.id
        }
    });

    // Verificar si se obtiene un proyecto en la consulta
    if (!proyecto) return next();

    // Mostrar la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del proyecto',
        proyectos,
        proyecto,
        tareas
    })
};

exports.formularioEditar = async (req, res) => {
    // Obtener todos los proyectos del usuario actual
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = await Proyecto.findAll({
        where : {
            usuarioId : usuarioId
        }
    });

    // Obtener el proyecto a editar
    const proyectoPromise = Proyecto.findOne({
        where : {
            id : req.params.id
        }
    });

    // Promise con destructuring
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
        nombrePagina : 'Editar proyecto',
        proyectos,
        proyecto
    })
};

exports.actualizarProyecto = async (req, res) => {
    // Obtener todos los proyectos del usuario actual
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyecto.findAll({
        where : {
            usuarioId : usuarioId
        }
    });

    // Validar que el input del formulario traiga un valor
    // Utilizamos asignación por destructuring
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
    const { nombre } = req.body;
    let errores = [];

    // Verificar si el nombre del proyecto tiene un valor
    if (!nombre) {
        errores.push({'texto': 'El nombre del proyecto no puede ser vacío.'});
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo proyecto',
            proyectos,
            errores
        });
    } else {
        // No existen errores
        // Inserción en la base de datos.
        await Proyecto.update(
            { nombre },
            { where : {
                id : req.params.id
            }}
        );

        // Redirigir hacia la ruta principal
        res.redirect('/');
    }
};

exports.eliminarProyecto = async (req, res, next) => {
    // La información se puede obtener de req, query o params
    // Obtener la información por destructuring
    const {urlProyecto} = req.query;

    // Eliminar el proyecto utilizando Sequelize
    const resultado = await Proyecto.destroy({
        where : {
            url : urlProyecto
        }
    });

    // Si el proyecto no se puede eliminar
    if (!resultado) {
        return next();
    }

    // Tipos de respuestas de parte del backend (servidor)
    // https://developer.mozilla.org/es/docs/Web/HTTP/Status
    res.status(200).send('Proyecto eliminado correctamente');
};