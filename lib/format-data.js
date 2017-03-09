// it takes an array of raw data coming from the spreadsheet
// and creates a new array that will be sended to the client
module.exports = function formatData (rawData) {
    // we take just the first sheet of the spreadsheet
    const rows = rawData[0]

    // the returned object is almost the same that it comes except
    // for the 'date' property that is transformed into a JavaScript
    // date valid format
    return rows.map(row => {
        return Object.assign(
            row,
            {
                date: new Date(row.date)
            }
        )
    })
}
