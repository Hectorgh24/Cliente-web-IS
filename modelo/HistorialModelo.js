class HistorialModelo {
    constructor() {
        // Defino la ruta base del servicio web para el historial
        this.urlBase = 'http://localhost:8080/PacketWorldAPI/webresources/envio-historial-estatus/obtener/';
    }

    async consultarHistorial(noGuia) {
        try {
            const respuesta = await fetch(`${this.urlBase}${noGuia}`);

            if (!respuesta.ok) {
                throw new Error(`Error en la petición: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            console.error("Error en el modelo de historial:", error);
            throw error;
        }
    }
}