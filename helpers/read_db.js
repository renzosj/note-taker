const fs = require('fs');

module.exports = function readDatabase(db_data) {
    var db_data = fs.readFileSync('./db/db.json', 'utf8', (err, data) => {
        err ? console.error(err) : console.log("Database successfully read")
        return data;
    });  
    //console.info(db_data);
    return db_data;
};

