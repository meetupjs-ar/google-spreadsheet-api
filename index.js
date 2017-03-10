// if we're in development, we require an specific configuration located at '.env'
// at production, that configuration is setted directly and we don't use that file
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// 'gsheets' needs this polyfill
require('isomorphic-fetch')

const cache = require('memory-cache')
const gsheets = require('gsheets')
const microCors = require('micro-cors')
const { send } = require('micro')

const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION)
const cors = microCors({
    allowMethods: ['GET']
})

async function handler (req, res) {
    try {
        // we look for the data in the memory cache
        // if it's not present, we fetch, format and store the data into the cache
        if (!cache.get('data')) {
            const worksheet = await gsheets.getWorksheetById(process.env.SPREADSHEET_ID, process.env.WORKSHEET_ID)
            const data = worksheet.data.map(row => Object.assign({}, row, { date: new Date(row.date) }))

            cache.put('data', data, cacheExpiration)
        }

        send(res, 200, cache.get('data'))
    } catch (error) {
        send(res, 500, `Ups! Hubo un error al obtener los datos\n\n${error.message}`)
    }
}

module.exports = cors(handler)
