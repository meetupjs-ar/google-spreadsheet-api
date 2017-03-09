// if we're in development, we require an specific configuration located at '.env'
// at production, that configuration is setted directly adn we don't use that file
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// 'gsheets' needs this polyfill
require('isomorphic-fetch')

const cache = require('memory-cache')
const gsheets = require('gsheets')
const microCors = require('micro-cors')
const { send } = require('micro')

const formatData = require('./lib/format-data')
const getWorksheetsData = require('./lib/get-worksheets-data')

const cacheExpiration = parseInt(process.env.CACHE_EXPIRATION)
const cors = microCors({
    allowMethods: ['GET']
})

async function handler (req, res) {
    try {
        // we look for the data in the memory cache
        // if it's not present, we fetch, format and store the data into the cache
        if (!cache.get('data')) {
            const worksheetData = await gsheets.getSpreadsheet(process.env.SPREADSHEET_ID)
            const workbookData = await getWorksheetsData(worksheetData)
            const data = formatData(workbookData)

            // 1 minute of living time
            cache.put('data', data, cacheExpiration)
        }

        send(res, 200, cache.get('data'))
    } catch (error) {
        send(res, 500, `Ups! Hubo un error al obtener los datos\n\n${error.message}`)
    }
}

module.exports = cors(handler)
