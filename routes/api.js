const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Een voorbeeldroute om gegevens uit de database op te halen
router.get('/data', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM example_table');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//ophalen van alle catagorien
router.get('/catagory', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM catagory');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//ophalen van alle types
router.get('/type', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM type');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route voor het toevoegen van een snack
router.post('/snack', async (req, res) => {
    const { name, price, catagory_id, type_id } = req.body;
    if (!name || !price || !catagory_id || !type_id) {
        return res.status(400).json({ error: 'Alle velden zijn verplicht' });
    }

    try {
        const query = `
            INSERT INTO snack (name, price, catagory_id, type_id) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [name, price, catagory_id, type_id]);
        res.status(201).json({ message: 'Snack toegevoegd', snackId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route om alle snack op te halen
router.get('/snacks', async (req, res) => {
    try {
        const query = `
            SELECT snack.id, snack.name, snack.price, 
                   catagory.name AS category_name, 
                   type.name AS type_name
            FROM snack
            JOIN catagory ON snack.catagory_id = catagory.id
            JOIN type ON snack.type_id = type.id
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Fout bij ophalen snack:', error.message);
        res.status(500).json({ error: 'Er ging iets mis met het ophalen van snacks.' });
    }
});

module.exports = router;