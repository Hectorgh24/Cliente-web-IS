class HistorialVista {
    constructor() {
        this.contenedorLineaTiempo = document.getElementById('contenedor-linea-tiempo');
        this.mensajeError = document.getElementById('mensaje-error');
        this.seccionResultados = document.getElementById('seccion-resultados');
    }

    limpiarVista() {
        this.contenedorLineaTiempo.innerHTML = '';
        this.mensajeError.style.display = 'none';
        this.seccionResultados.style.display = 'none';
    }

    mostrarError(mensaje) {
        this.mensajeError.textContent = mensaje;
        this.mensajeError.style.display = 'block';
    }

    formatearFecha(fechaString) {
        const fecha = new Date(fechaString);
        return fecha.toLocaleString('es-MX', { 
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });
    }

    mostrarHistorial(listaHistorial) {
        this.seccionResultados.style.display = 'block';
        let htmlTimeline = '';

        if (listaHistorial.length === 0) {
            this.contenedorLineaTiempo.innerHTML = '<p style="text-align:center">No hay historial disponible.</p>';
            return;
        }

        listaHistorial.forEach((evento, index) => {
            const claseReciente = index === 0 ? 'evento-reciente' : '';
            
            htmlTimeline += `
                <div class="evento-timeline ${claseReciente}">
                    <div class="punto-timeline"></div>
                    <div class="contenido-evento">
                        <div class="fecha-evento">${this.formatearFecha(evento.fechaHora)}</div>
                        <h3 class="estatus-evento">${evento.estatus.toUpperCase()}</h3>
                        <p class="comentario-evento">${evento.comentario}</p>
                    </div>
                </div>
            `;
        });

        this.contenedorLineaTiempo.innerHTML = htmlTimeline;
    }
}