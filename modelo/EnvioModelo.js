
class EnvioModelo {
    constructor() {
        this.urlBaseEnvio = 'http://localhost:8080/PacketWorldAPI/webresources/envio/obtener-envio/';
        this.urlBaseHistorial = 'http://localhost:8080/PacketWorldAPI/webresources/envio-historial-estatus/obtener/';
        this.urlBasePaquetes = 'http://localhost:8080/PacketWorldAPI/webresources/paquete/obtener-paquetes-envio/';
    }


    // Obtener información del envío por número de guía.
    async consultarEnvio(noGuia) {
        const respuesta = await fetch(`${this.urlBaseEnvio}${noGuia}`);

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        return Array.isArray(datos) && datos.length > 0 ? datos[0] : null;
    }

    // Obtener información historial de estatus de un envío por número de guía.
    async consultarHistorial(noGuia) {
        const respuesta = await fetch(`${this.urlBaseHistorial}${noGuia}`);

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                return []; // No hay historial disponible
            }
            throw new Error(`Error al consultar historial: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        
        // Ordenar del más reciente al más antiguo
        return this._ordenarPorFechaDescendente(datos);
    }

    //  Obtener paquetes asociados a un envío.
    async consultarPaquetes(idEnvio) {
        const respuesta = await fetch(`${this.urlBasePaquetes}${idEnvio}`);

        if (!respuesta.ok) {
            throw new Error(`Error al consultar paquetes: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        return Array.isArray(datos) ? datos : [];
    }

    // Ordenar array de objetos por fecha descendente.
    _ordenarPorFechaDescendente(datos) {
        if (!Array.isArray(datos)) return [];
        
        return [...datos].sort((a, b) => {
            const fechaA = new Date(a.fechaHora);
            const fechaB = new Date(b.fechaHora);
            return fechaB - fechaA;
        });
    }
}
