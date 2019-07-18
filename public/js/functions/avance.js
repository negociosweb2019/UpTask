import Swal from "sweetalert2";

export const actualizarAvance = () => {
    // Seleccionar las tareas existentes
    const tareas = document.querySelectorAll('li.tarea');

    if (tareas.length) {
        // Seleccionar las tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo');

        // Calcular el avance del proyecto
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);

        // Mostrar el resultado
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = `${avance}%`;

        // Mostrar un mensaje de felicitación al terminar todas las tareas
        if (avance === 100) {
            Swal.fire(
                'Proyecto completado',
                'Has completado todas las tareas del proyecto',
                'success'
            )
        }
    }
}