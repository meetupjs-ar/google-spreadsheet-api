// si estamos en desarrollo, requerimos el archivo '.env'
// en producción, esa configuración se recibe directamente como variables de entorno
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

require('isomorphic-fetch')

const formatEvents = require('./lib/format-events')
const cache = require('memory-cache')
const gsheets = require('gsheets')
const microCors = require('micro-cors')
const { send } = require('micro')

const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION)
const cors = microCors({
    allowMethods: ['GET']
})

async function handler(req, res) {
    try {
        // si el resultado del API no fue previamente cacheado
        if (!cache.get('data')) {
            // buscamos los datos de la planilla y hoja indicado
            const worksheet = await gsheets.getWorksheetById(
                process.env.SPREADSHEET_ID,
                process.env.WORKSHEET_ID
            )
            // formateamos la lista de eventos para que tenga solo los datos que necesitamos
            const data = formatEvents(worksheet.data)

            // guardamos los datos en cache por el tiempo indicado por configuración
            cache.put('data', data, cacheExpiration)
        }

        send(res, 200, cache.get('data'))
    } catch (error) {
        send(res, 500, error.message)
    }
}

module.exports = cors(handler)
