document.addEventListener('DOMContentLoaded', () => {
    const modelo = new HistorialModelo();
    const vista = new HistorialVista();
    
    const botonBuscar = document.getElementById('btn-buscar-historial');
    const inputGuia = document.getElementById('txt-guia-historial');

    botonBuscar.addEventListener('click', async () => {
        const guia = inputGuia.value.trim();

        if (!guia) {
            vista.mostrarError("Por favor, ingresa el número de guía.");
            return;
        }

        vista.limpiarVista();

        try {
            const datos = await modelo.consultarHistorial(guia);
            
            if (datos) {
                vista.mostrarHistorial(datos);
            } else {
                vista.mostrarError("No se encontró historial para esa guía.");
            }
        } catch (error) {
            vista.mostrarError("Ocurrió un error al consultar el historial.");
        }
    });
});