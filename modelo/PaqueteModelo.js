class PaqueteModelo {
    constructor() {
        // Endpoint base para obtener paquetes por ID de envío
        this.urlBase = 'http://localhost:8080/PacketWorldAPI/webresources/paquete/obtener-paquetes-envio/';
    }

    async consultarPaquetes(idEnvio) {
        try {
            const respuesta = await fetch(`${this.urlBase}${idEnvio}`);

            if (!respuesta.ok) {
                throw new Error(`Error en la petición: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            return datos; // Retorna la lista completa de paquetes
        } catch (error) {
            console.error("Error en el modelo de paquetes:", error);
            throw error;
        }
    }
}