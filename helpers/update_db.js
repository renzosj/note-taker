const fs = require('fs');

module.exports = function updateDatabase(fileStr) {
    fs.writeFile(`./db/db.json`, fileStr, (err) =>
    err
    ? console.error(err)
    : console.log("Database successfully updated")
    )
}