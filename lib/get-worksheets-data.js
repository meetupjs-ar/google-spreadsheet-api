const getWorksheetData = require('./get-worksheet-data')

// it receives an spreadsheet and resolves to a new promise
// that will contain an array of each worksheet's data
module.exports = function getWorksheetsData (spreadsheet) {
    const promises = spreadsheet.worksheets.map(getWorksheetData)

    return Promise.all(promises)
}
