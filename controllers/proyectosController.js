// Importar el modelo
const Proyecto = require('../models/Proyecto');

exports.proyectosHome = async (req, res) => {
    // Obtener todos los proyectos
    const proyectos = await Proyecto.findAll();

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    });
};

exports.formularioProyecto = async (req, res) => {
    // Obtener todos los proyectos (modelos)
    const proyectos = await Proyecto.findAll();

    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo proyecto',
        proyectos
    });
};

exports.nuevoProyecto = async (req, res) => {
    // Obtener todos los proyectos (modelos)
    const proyectos = await Proyecto.findAll();

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
        await Proyecto.create({ nombre });

        // Redirigir hacia la ruta principal
        res.redirect('/');
    }
};

exports.proyectoPorUrl = async (req, res, next) => {
    // Obtener todos los modelos
    const proyectosPromise = Proyecto.findAll();

    // Obtener el proyecto a editar
    const proyectoPromise = Proyecto.findOne({
        where : {
            url : req.params.url
        }
    });

    // Promise con destructuring
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Verificar si se obtiene un proyecto en la consulta
    if (!proyecto) return next();

    // Mostrar la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del proyecto',
        proyectos,
        proyecto
    })
};

exports.formularioEditar = async (req, res) => {
    // Obtener todos los modelos
    const proyectosPromise = Proyecto.findAll();

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
    // Obtener todos los proyectos (modelos)
    const proyectos = await Proyecto.findAll();

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