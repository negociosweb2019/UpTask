exports.proyectosHome =  (req, res) => {
    res.render('index', {
        nombrePagina : 'Proyectos'
    });
};

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo proyecto'
    });
};

exports.nuevoProyecto = (req, res) => {
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
            errores
        });
    } else {
        // No existen errores
        // Inserción en la base de datos.
    }
};