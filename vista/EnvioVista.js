class EnvioVista {
    constructor() {
        this.tablaCuerpo = document.getElementById('cuerpo-tabla');
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

    mostrarResultados(envio) {
        this.seccionResultados.style.display = 'block';

       
        const camposAMostrar = [
            { etiqueta: "Guía", valor: envio.noGuia },
            { etiqueta: "Estatus", valor: envio.estatus },
            { etiqueta: "Sucursal Origen", valor: envio.sucursal },
            { etiqueta: "Cliente", valor: envio.cliente },
            { etiqueta: "Tel. Cliente", valor: envio.clienteTelefono },
            { etiqueta: "Destinatario", valor: `${envio.destinatarioNombre} ${envio.destinatarioApellidoPaterno}` },
            { etiqueta: "Dirección Destino", valor: envio.destinatarioDireccion },
            { etiqueta: "Conductor Asignado", valor: envio.conductor },
            { etiqueta: "Costo", valor: `$${envio.costo}` }
        ];

        let htmlFilas = '';
        
        camposAMostrar.forEach(campo => {
            htmlFilas += `
                <tr>
                    <td class="columna-etiqueta">${campo.etiqueta}</td>
                    <td class="columna-valor">${campo.valor}</td>
                </tr>
            `;
        });

        this.tablaCuerpo.innerHTML = htmlFilas;
    }
}