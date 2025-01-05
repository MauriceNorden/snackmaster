const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();

// 🔹 Registreren van een gebruiker
router.post('/register', (req, res) => {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
        return res.status(400).json({ error: 'Alle velden zijn verplicht' });
    }

    // Wachtwoord hashen
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Fout bij hashen van wachtwoord' });
        }

        const query = `INSERT INTO user (username, password, email, phone) VALUES (?, ?, ?, ?)`;
        db.run(query, [username, hashedPassword, email, phone], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Gebruiker bestaat mogelijk al' });
            }
            res.status(201).json({ message: 'Gebruiker geregistreerd', userId: this.lastID });
        });
    });
});

// 🔹 Inloggen van een gebruiker
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Gebruikersnaam en wachtwoord zijn verplicht' });
    }

    const query = `SELECT * FROM user WHERE username = ?`;
    db.get(query, [username], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Ongeldige gebruikersnaam of wachtwoord' });
        }

        // Wachtwoord controleren
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: 'Ongeldig wachtwoord' });
            }

            // ✅ Gebruikersnaam opslaan in sessie
            req.session.userId = user.id;
            req.session.username = user.username;

            res.redirect('/'); // Stuur de gebruiker naar de homepagina
        });
    });
});


// 🔹 Uitloggen van een gebruiker
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Uitloggen mislukt' });
        }
        res.json({ message: 'Uitgelogd' });
    });
});

module.exports = router;
