// Node Modules
const express = require('express');
// Route Modules
const index = require('./routes/indexRoute.js');
const api = require('./routes/noteRoutes.js');
// Global Vars
const PORT = process.env.PORT || 3001;
app = express();

//Express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Midware for page routes
app.use('/', index);
app.use('/api/notes', api);

// Midware for static folder 'public'
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  