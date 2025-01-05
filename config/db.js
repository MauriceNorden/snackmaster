const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Maak of open de database
const db = new sqlite3.Database(path.join(__dirname, 'data.sqlite'), (err) => {
    if (err) {
        console.error('Fout bij verbinden met de database:', err.message);
    } else {
        console.log('Verbonden met SQLite database.');
    }
});

// Exporteer de database-verbinding
module.exports = db;