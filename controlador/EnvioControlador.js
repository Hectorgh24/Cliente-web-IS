//Importamos (simbólicamente, ya que cargaremos los scripts en el HTML en orden)
//En JS puro sin módulos ES6, dependemos del orden de carga en el HTML.

document.addEventListener('DOMContentLoaded', () => {
    const modelo = new EnvioModelo();
    const vista = new EnvioVista();
    const botonBuscar = document.getElementById('btn-buscar');
    const inputGuia = document.getElementById('txt-guia');

    botonBuscar.addEventListener('click', async () => {
        const guia = inputGuia.value.trim();

        if (!guia) {
            vista.mostrarError("Por favor, ingresa un número de guía.");
            return;
        }

        vista.limpiarVista();

        try {
            //El controlador pide datos al Modelo
            const datos = await modelo.consultarEnvio(guia);
            
            //Si hay datos, el controlador le dice a la Vista que los muestre
            if (datos) {
                vista.mostrarResultados(datos);
            } else {
                vista.mostrarError("No se encontraron datos para esa guía.");
            }
        } catch (error) {
            vista.mostrarError("Ocurrió un error al buscar el envío. Verifica la conexión o la guía.");
        }
    });
});