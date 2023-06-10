// Node Modules
const express = require('express');
const path = require('path');

// Local Modules
const notes_db = require('./db/db.json');
const updateDatabase = require('./helpers/update_db');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

app = express();

//Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) =>
    res.json(notes_db)
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    // Deconstruct request body
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
      
        // stringify db file and newNote object 
        const newNoteStr = JSON.stringify(newNote);
        let databaseString = JSON.stringify(notes_db);

          // if database is empty, simply add the first note to db
          if (newNoteStr === "") {
            const newNoteFileStr = `[${newNoteStr}]`;
            updateDatabase(newNoteFileStr, newNote.title);
            } else {
                // Remove braces, add new note and db strings together and re-add braces
                databaseString = databaseString.replace('[', '');
                databaseString = databaseString.replace(']', '');

                const newNoteFileStr = `[\n    ${newNoteStr},${databaseString}]`;

                // save to file updated database
                updateDatabase(newNoteFileStr, newNote.title);  
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
// delete functionality unfinished
app.delete('/api/notes/:id', (req, res) => {
    let databaseString = JSON.stringify(notes_db);

    const id = req.params.id;

    for (var i = 0; i < notes_db.length; i++) {
        if (id === notes_db[i].note_id) {
            console.log("id match found, commence deletion");

            let title = notes_db[i].title;
            let text = notes_db[i].text;
            
            console.log(`To be deleted Note: ${title}: ${text} `);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  