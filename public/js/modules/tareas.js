import Axios from "axios";
import Swal from "sweetalert2";

// Seleccionar el objeto HTML que contiene las tareas
const tareas = document.querySelector('.listado-pendientes');

// Verificar si existe el objeto
if (tareas){
    // Agregarndo el evento click
    tareas.addEventListener('click', e => {
        // Actualizar estado de la tarea
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

        // Eliminar tarea
        if  (e.target.classList.contains('fa-trash')){
            // Obteniendo el HTML de la tarea
            // Necesitamos acceder al elemento HTML <li></li> de cada tarea
            const tareaHTML = e.target.parentElement.parentElement;
            // Obtener el id de la tarea
            const idTarea = tareaHTML.dataset.tarea;
            
            // Mostrar una alerta de Sweet Alert
            Swal.fire({
                title: '¿Estás seguro que deseas borrar esta tarea?',
                text: '¡Si eliminas una tarea no se puede recuperar!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Borrar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    // Enviar el delete mediante Axios
                    const url = `${location.origin}/tarea/${idTarea}`;

                    Axios.delete(url, {params : { idTarea } })
                        .then(function(respuesta){
                            if (respuesta.status === 200) {
                                // Eliminar el nodo <li></li> desde el padre
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                // Mostrar un mensaje de eliminación realizada
                                Swal.fire(
                                    'Tarea eliminada',
                                    respuesta.data,
                                    'success'
                                )
                            }
                        })
                }
            })
        }
    });
}

export default tareas;