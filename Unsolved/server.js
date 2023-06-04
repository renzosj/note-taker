// Node Modules
const express = require('express');
const fs = require('fs');
const path = require('path');
// Local Modules
const backEnd = require('./lib/back-end');
const note_Obj = require('./lib/note_Obj');

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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  