import Axios from "axios";

// Seleccionar el objeto HTML que contiene las tareas
const tareas = document.querySelector('.listado-pendientes');

// Verificar si existe el objeto
if (tareas){
    // Agregarndo el evento click
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')){
            // Definir valores del ícono y del data-tarea del li
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            
            // request hacia la ruta encargada de procesar la petición
            const url = `${location.origin}/tarea/${idTarea}`;

            Axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if (respuesta.status === 200){
                        // Cambiar el estado del botón
                        // Toggle añade o remueve un clase a un elemento HTML5
                        icono.classList.toggle('completo');
                    }
                });
        }
    });
}

export default tareas;