// Node Modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');
// Local Modules
const notes_db = require('./db/db.json');

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

    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        const newNoteStr = JSON.stringify(newNote);
        let databaseString = JSON.stringify(notes_db);

        databaseString = databaseString.replace('[', '');
        databaseString = databaseString.replace(']', '');

        const newNoteFileStr = `[\n    ${newNoteStr},${databaseString}]`;
        updateDatabase(newNoteFileStr);

        function updateDatabase(fileStr) {
            fs.writeFile(`./db/db.json`, fileStr, (err) =>
            err
              ? console.error(err)
              : console.log(`Review for ${newNote.title} has been written to JSON file`)
            )
        }

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
    
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  