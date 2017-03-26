const moment = require('moment-msdate')

module.exports = function formatEvents (events) {
    // Devolvemos una nueva lista de objetos con los nombres en inglés para
    // respetar el formato que pide calendar-api
    return events.map(e => ({
        // creamos una fecha a partir de un "msdate"
        // El 0 es para que no aplique conversión por timezone
        date: moment.fromOADate(e['Día y Hora'], 0),
        eventName: e['Nombre del evento'],
        eventLink: e.Link,
        place: e.Lugar,
        placeAddress: e['Link al lugar en Google Maps']
    }))
}
