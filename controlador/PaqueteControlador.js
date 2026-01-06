document.addEventListener('DOMContentLoaded', () => {
    const modelo = new PaqueteModelo();
    const vista = new PaqueteVista();
    const botonBuscar = document.getElementById('btn-buscar-paquetes');
    const inputIdEnvio = document.getElementById('txt-id-envio');

    botonBuscar.addEventListener('click', async () => {
        const idEnvio = inputIdEnvio.value.trim();

        if (!idEnvio) {
            vista.mostrarError("Por favor, ingresa el ID del envío.");
            return;
        }

        // Validación extra: asegurarse que sea número (opcional pero recomendado)
        if (isNaN(idEnvio)) {
            vista.mostrarError("El ID del envío debe ser un número.");
            return;
        }

        vista.limpiarVista();

        try {
            const datos = await modelo.consultarPaquetes(idEnvio);
            
            // Verificamos si obtuvimos datos (puede ser una lista vacía o con elementos)
            if (datos) {
                vista.mostrarResultados(datos);
            } else {
                vista.mostrarError("No se encontraron datos.");
            }
        } catch (error) {
            vista.mostrarError("Ocurrió un error al buscar los paquetes. Verifica la conexión.");
        }
    });
});