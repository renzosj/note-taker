// Node Modules
const router = require('express').Router();
// Local Modules
const updateDatabase = require('../helpers/update_db.js');
const uuid = require('../helpers/uuid.js');
const readDatabase = require('../helpers/read_db.js');

router.get('/', async (req, res) => {
    if (!readDatabase()) {
        res.json(readDatabase());
        return;
    }
    const db_data = await JSON.parse(readDatabase());
    //console.info(db_data);
    res.json(db_data);
});

router.post('/', async (req, res) => {
    console.info(`${req.method} request received to add a note`);
    // Deconstruct request body to note obj
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
      
        // read db file and stringify newNote object 
        const newNoteStr = JSON.stringify(newNote);
        let databaseString = await readDatabase();

          // if database is empty, simply add the first note to db
          if (!databaseString) {
            const newNoteFileStr = `[${newNoteStr}]`;
            updateDatabase(newNoteFileStr);
            } else {
                // Remove braces, add new note and db strings together and re-add braces
                databaseString = databaseString.replace('[', '');
                databaseString = databaseString.replace(']', '');

                const newNoteFileStr = `[\n    ${newNoteStr},${databaseString}]`;
                // save to file updated database
                updateDatabase(newNoteFileStr);  
            }
        
        const response = {
            status: 'success',
            body: newNote,
        };
        //send response 
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const empty = "";
    let db_data = await JSON.parse(readDatabase());
    console.info(db_data);

    if (db_data.length <= 1) {
        updateDatabase(empty);
        return;
    }

    for (var i = 0; i < db_data.length; i++) {
        if (id === db_data[i].note_id) {
            
            //console.log("id match found");

            const title = db_data[i].title;
            const text = db_data[i].text;
            
            //console.log(`To be deleted Note: ${title}: ${text} `);

            noteDel = {
                title: title,
                text: text,
                note_id: id
            };
            // stringify note obj to utilize String replace method
            noteToDelStr = JSON.stringify(noteDel) + ",";

            // remove note and update db
            db_data = JSON.stringify(db_data);
            const databaseString = db_data.replace(noteToDelStr, "");
            updateDatabase(databaseString);

            response = {
                status: 'success',
                body: noteDel,
            };
            res.status(201).json(response);
            return;
        }
        res.status(501).json("Error in deletion");
        
    }
});

module.exports = router;