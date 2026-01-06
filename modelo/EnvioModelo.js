class EnvioModelo {
    constructor() {
        this.urlBase = 'http://localhost:8080/PacketWorldAPI/webresources/envio/obtener-envio/';
    }

    async consultarEnvio(noGuia) {
        try {
            const respuesta = await fetch(`${this.urlBase}${noGuia}`);

            if (!respuesta.ok) {
                throw new Error(`Error en la petición: ${respuesta.status}`);
            }

            const datos = await respuesta.json();

            if (Array.isArray(datos)) {
                if (datos.length > 0) {
                    return datos[0]; 
                } else {
                    return null; 
                }
            }

            return datos;
        } catch (error) {
            console.error("Error en el modelo:", error);
            throw error; 
        }
    }
}