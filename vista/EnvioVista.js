
class EnvioVista {
    constructor() {
        this._inicializarElementos();
    }

     // Inicializa las referencias a los elementos del DOM.
    _inicializarElementos() {
        this.mensajeError = document.getElementById('mensaje-error');
        
        // Secciones
        this.seccionEnvio = document.getElementById('seccion-envio');
        this.seccionPaquetes = document.getElementById('seccion-paquetes');
        this.seccionHistorial = document.getElementById('seccion-historial');
        
        // Cuerpos de tablas
        this.tablaEnvioCuerpo = document.getElementById('tabla-envio-cuerpo');
        this.tablaPaquetesCuerpo = document.getElementById('tabla-paquetes-cuerpo');
        this.contenedorHistorial = document.getElementById('contenedor-historial');
    }

    // Limpiar todas las secciones de la vista.
    limpiarVista() {
        this._ocultarElemento(this.mensajeError);
        this._ocultarElemento(this.seccionEnvio);
        this._ocultarElemento(this.seccionPaquetes);
        this._ocultarElemento(this.seccionHistorial);
        
        this.tablaEnvioCuerpo.innerHTML = '';
        this.tablaPaquetesCuerpo.innerHTML = '';
        this.contenedorHistorial.innerHTML = '';
    }

    // Mostrar un mensaje de error.
    mostrarError(mensaje) {
        this.mensajeError.textContent = mensaje;
        this._mostrarElemento(this.mensajeError);
    }

    // Mostrar la información del envío.
    mostrarEnvio(envio) {
        const camposEnvio = this._construirCamposEnvio(envio);
        this.tablaEnvioCuerpo.innerHTML = this._generarFilasTablaDetalle(camposEnvio);
        this._mostrarElemento(this.seccionEnvio);
    }

    // Mostrar la lista de paquetes del envío.
    mostrarPaquetes(paquetes) {
        if (!paquetes || paquetes.length === 0) {
            this._ocultarElemento(this.seccionPaquetes);
            return;
        }

        this.tablaPaquetesCuerpo.innerHTML = this._generarFilasTablaPaquetes(paquetes);
        this._mostrarElemento(this.seccionPaquetes);
    }

    // Mostrar el historial de estatus del envío.
    mostrarHistorial(historial) {
        if (!historial || historial.length === 0) {
            this._ocultarElemento(this.seccionHistorial);
            return;
        }

        this.contenedorHistorial.innerHTML = this._generarTimelineHistorial(historial);
        this._mostrarElemento(this.seccionHistorial);
    }

    // Construir el array de campos a mostrar del envío.
    _construirCamposEnvio(envio) {
        const nombreDestinatario = this._construirNombreCompleto(
            envio.destinatarioNombre,
            envio.destinatarioApellidoPaterno,
            envio.destinatarioApellidoMaterno
        );

        return [
            { etiqueta: "Estatus", valor: this._formatearEstatus(envio.estatus) },
            { etiqueta: "Destinatario", valor: nombreDestinatario },
            { etiqueta: "Dirección de Destino", valor: envio.destinatarioDireccion },
            { etiqueta: "Cliente", valor: envio.cliente },
            { etiqueta: "Correo del Cliente", valor: envio.clienteCorreo },
            { etiqueta: "Teléfono del Cliente", valor: envio.clienteTelefono },
            { etiqueta: "Sucursal de Origen", valor: envio.sucursal },
            { etiqueta: "Dirección de Sucursal", valor: envio.sucursalDireccion },
            { etiqueta: "Costo Total", valor: this._formatearMoneda(envio.costo) },
            { etiqueta: "Conductor Asignado", valor: envio.conductor || 'Sin asignar' }
        ];
    }

    // Construir el nombre completo concatenado.
    _construirNombreCompleto(nombre, apellidoPaterno, apellidoMaterno) {
        return [nombre, apellidoPaterno, apellidoMaterno]
            .filter(parte => parte && parte.trim())
            .join(' ');
    }

    // Formatear el estatus con capitalización apropiada.
    _formatearEstatus(estatus) {
        if (!estatus) return 'Desconocido';
        return estatus.charAt(0).toUpperCase() + estatus.slice(1);
    }

    // Formatear un valor numérico como moneda.
    _formatearMoneda(valor) {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(valor || 0);
    }

    // Formatear una fecha ISO a formato legible.
    _formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        return new Intl.DateTimeFormat('es-MX', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(fecha);
    }

    // Generar las filas HTML para la tabla de detalles.
    _generarFilasTablaDetalle(campos) {
        return campos.map(campo => `
            <tr>
                <td class="columna-etiqueta">${campo.etiqueta}</td>
                <td class="columna-valor">${campo.valor}</td>
            </tr>
        `).join('');
    }

    // Generar las filas HTML para la tabla de paquetes.
    _generarFilasTablaPaquetes(paquetes) {
        return paquetes.map((paquete, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${paquete.descripcion}</td>
                <td>${this._formatearValor(paquete.alto)}</td>
                <td>${this._formatearValor(paquete.ancho)}</td>
                <td>${this._formatearValor(paquete.profundidad)}</td>
                <td>${this._formatearValor(paquete.peso)}</td>
            </tr>
        `).join('');
    }

    // Formatear un valor numérico.
    _formatearValor(valor) {
        return parseFloat(valor).toFixed(2);
    }

    // Generar el HTML del timeline de historial.
    _generarTimelineHistorial(historial) {
        return historial.map((registro, index) => `
            <div class="timeline-item ${index === 0 ? 'timeline-item-actual' : ''}">
                <div class="timeline-indicador">
                    <span class="timeline-punto"></span>
                    ${index < historial.length - 1 ? '<span class="timeline-linea"></span>' : ''}
                </div>
                <div class="timeline-contenido">
                    <div class="timeline-estatus">${this._formatearEstatus(registro.estatus)}</div>
                    <div class="timeline-fecha">${this._formatearFecha(registro.fechaHora)}</div>
                    ${registro.comentario ? `<div class="timeline-comentario">${registro.comentario}</div>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Mostrar un elemento HTML.
    _mostrarElemento(elemento) {
        if (elemento) elemento.style.display = 'block';
    }

    // Ocultar un elemento HTML.
    _ocultarElemento(elemento) {
        if (elemento) elemento.style.display = 'none';
    }
}
