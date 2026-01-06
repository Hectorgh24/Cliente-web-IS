class EnvioModelo {
    constructor() {
        this.urlBase = 'http://localhost:8080/PacketWorldAPI/webresources/envio/obtener-envio/';
    }

    async consultarEnvio(noGuia) {
        try {
            // Construimos la URL completa con el número de guía
            const respuesta = await fetch(`${this.urlBase}${noGuia}`);

            if (!respuesta.ok) {
                throw new Error(`Error en la petición: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            console.error("Error en el modelo:", error);
            throw error; // Lanzamos el error para que el controlador lo maneje
        }
    }
}