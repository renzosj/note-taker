const fs = require('fs');

module.exports = function updateDatabase(fileStr, noteTitle) {
    fs.writeFile(`./db/db.json`, fileStr, (err) =>
    err
    ? console.error(err)
    : console.log(`Review for ${noteTitle} has been written to JSON file`)
    )
}