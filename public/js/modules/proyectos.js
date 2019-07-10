// Importando los módulos necesarios
// Se utiliza la sintáxis de ECMAScript2015 (6ta Edición - JS)
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import
import Swal from 'sweetalert2';
import axios from 'axios';

// Obtener el botón desde el DOM
const btnEliminar = document.querySelector('#eliminar-proyecto');

// Agregar un evento al botón
btnEliminar.addEventListener('click', e => {
    // Capturar la URL del proyecto desde la propiedad HTML5
    const urlProyecto = e.target.dataset.proyectoUrl;
    
    Swal.fire({
        title: '¿Estás seguro que deseas borrar este proyecto?',
        text: "¡Si eliminas un proyecto no se puede recuperar!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
            // Se confirma la eliminación dando click en el botón Borrar.
            // En este punto se envía una petición a Axios.
            // Debemos previamente obtener la URL del sitio.
            const url = `${location.origin}/proyecto/${urlProyecto}`;
            
            axios.delete(url, { params: {urlProyecto}})
                .then(function(respuesta){
                    Swal.fire(
                        '¡Eliminado!',
                        respuesta.data,
                        'success'
                    )
                })
                .catch(() => {
                    Swal.fire({
                        type : 'error',
                        title : 'Un error ha ocurrido',
                        text : 'No se pudo eliminar el proyecto'
                    });
                })

            // Redireccionar al inicio 
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
      })
});

export default btnEliminar;