const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ophalen van alle categorieën
router.get('/catagory', (req, res) => {
    db.all('SELECT * FROM catagory', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Ophalen van alle types
router.get('/type', (req, res) => {
    db.all('SELECT * FROM type', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Route voor het toevoegen van een snack
router.post('/snack', (req, res) => {
    const { name, price, catagory_id, type_id } = req.body;

    if (!name || !price || !catagory_id || !type_id) {
        return res.status(400).json({ error: 'Alle velden zijn verplicht' });
    }

    const query = `
        INSERT INTO snack (name, price, catagory_id, type_id) 
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [name, price, catagory_id, type_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Snack toegevoegd', snackId: this.lastID });
    });
});

// Route om alle snacks op te halen
router.get('/snacks', (req, res) => {
    const query = `
        SELECT snack.id, snack.name, snack.price, 
               catagory.name AS category_name, 
               type.name AS type_name
        FROM snack
        JOIN catagory ON snack.catagory_id = catagory.id
        JOIN type ON snack.type_id = type.id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Fout bij ophalen snacks:', err.message);
            return res.status(500).json({ error: 'Er ging iets mis met het ophalen van snacks.' });
        }
        res.json(rows);
    });
});

module.exports = router;
