
class EnvioControlador {

    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this._inicializarEventos();
    }

     // Inicializar eventos de la aplicación.
    _inicializarEventos() {
        const botonBuscar = document.getElementById('btn-buscar');
        const inputGuia = document.getElementById('txt-guia');

        botonBuscar.addEventListener('click', () => this._manejarBusqueda());
        
        // Permitir buscar con Enter
        inputGuia.addEventListener('keypress', (evento) => {
            if (evento.key === 'Enter') {
                this._manejarBusqueda();
            }
        });
    }

    // Manejar evento de búsqueda.
    async _manejarBusqueda() {
        const inputGuia = document.getElementById('txt-guia');
        const noGuia = inputGuia.value.trim();

        if (!this._validarGuia(noGuia)) {
            return;
        }

        // Limpiar todas las secciones y elementos de la vista
        this.vista.limpiarVista();

        try {
            await this._buscarYMostrarEnvio(noGuia);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            this.vista.mostrarError('Ocurrió un error al buscar el envío. Verifica la conexión o el número de guía.');
        }
    }

    // Validar número de guía ingresado.
    _validarGuia(noGuia) {
        if (!noGuia) {
            this.vista.mostrarError('Por favor, ingresa un número de guía.');
            return false;
        }
        return true;
    }

    // Buscar y mostrar toda la información del envío.
    async _buscarYMostrarEnvio(noGuia) {
        // Primero obtener información del envío
        const envio = await this.modelo.consultarEnvio(noGuia);

        if (!envio) {
            this.vista.mostrarError('No se encontró ningún envío con ese número de guía.');
            return;
        }

        // Mostrar información del envío
        this.vista.mostrarEnvio(envio);

        // Cargar paquetes e historial en paralelo para mejor rendimiento
        await Promise.all([
            this._cargarPaquetes(envio.idEnvio),
            this._cargarHistorial(noGuia)
        ]);
    }

    // Cargar y mostrar los paquetes del envío.
    async _cargarPaquetes(idEnvio) {
        try {
            const paquetes = await this.modelo.consultarPaquetes(idEnvio);
            this.vista.mostrarPaquetes(paquetes);
        } catch (error) {
            console.error('Error al cargar paquetes:', error);
        }
    }

    // Cargar y mostrar el historial del envío.
    async _cargarHistorial(noGuia) {
        try {
            const historial = await this.modelo.consultarHistorial(noGuia);
            this.vista.mostrarHistorial(historial);
        } catch (error) {
            console.error('Error al cargar historial:', error);
        }
    }
}

// Inicializar aplicación cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', () => {
    const modelo = new EnvioModelo();
    const vista = new EnvioVista();
    new EnvioControlador(modelo, vista);
});
