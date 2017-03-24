const moment = require('moment-msdate')

module.exports = function formatEvents (events) {
    // Devolvemos una nueva lista de objetos con los nombres en inglés para
    // respetar el formato que pide calendar-api
    return events.map(e => ({
        // creamos una fecha a partir de un "msdate" (formato para almacenar fechas en planillas
        // de cálculo)
        date: moment.fromOADate(e.Fecha),
        eventName: e.Nombre,
        eventLink: e.Link,
        place: e.Lugar,
        placeAddress: e.Coordenadas
    }))
}
