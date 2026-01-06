class PaqueteVista {
    constructor() {
        this.tablaCuerpo = document.getElementById('cuerpo-tabla-paquetes');
        this.mensajeError = document.getElementById('mensaje-error');
        this.seccionResultados = document.getElementById('seccion-resultados');
    }

    limpiarVista() {
        this.tablaCuerpo.innerHTML = '';
        this.mensajeError.style.display = 'none';
        this.seccionResultados.style.display = 'none';
    }

    mostrarError(mensaje) {
        this.mensajeError.textContent = mensaje;
        this.mensajeError.style.display = 'block';
    }

    mostrarResultados(listaPaquetes) {
        this.seccionResultados.style.display = 'block';
        let htmlFilas = '';

        if (listaPaquetes.length === 0) {
            htmlFilas = '<tr><td colspan="5" style="text-align:center;">No se encontraron paquetes para este envío.</td></tr>';
        } else {
            // Iteramos sobre el array de paquetes para crear una fila por cada uno
            listaPaquetes.forEach(paquete => {
                htmlFilas += `
                    <tr>
                        <td>${paquete.descripcion}</td>
                        <td>${paquete.peso} kg</td>
                        <td>${paquete.alto} x ${paquete.ancho} x ${paquete.profundidad} cm</td>
                        <td>${paquete.noGuia}</td>
                        <td>#${paquete.idPaquete}</td>
                    </tr>
                `;
            });
        }

        this.tablaCuerpo.innerHTML = htmlFilas;
    }
}