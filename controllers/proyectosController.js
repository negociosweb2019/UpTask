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
};