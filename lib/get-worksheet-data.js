const gsheets = require('gsheets')

// it receives a worksheet and resolves its data
module.exports = function getWorksheetData (worksheetMetadata) {
    return new Promise((resolve, reject) => {
        gsheets.getWorksheet(process.env.SPREADSHEET_ID, worksheetMetadata.title)
            .then(worksheet => resolve(worksheet.data))
            .catch(reject)
    })
}
